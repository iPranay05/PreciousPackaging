"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";

// ─── Shared product data (mirrors products/page.tsx) ────────────────────────

type Product = {
  id: string;
  category: string;
  categorySlug: string;
  size: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  badge?: string;
};

// ─── Preset colours ──────────────────────────────────────────────────────────

const PRESET_COLORS = [
  { label: "Midnight Black",   hex: "#1C1C1E" },
  { label: "Ivory White",      hex: "#F5F0E8" },
  { label: "Champagne Gold",   hex: "#C9A84C" },
  { label: "Rose Gold",        hex: "#B76E79" },
  { label: "Deep Navy",        hex: "#2E7D32" },
  { label: "Emerald Green",    hex: "#215A4A" },
  { label: "Blush Pink",       hex: "#F4C2C2" },
  { label: "Slate Grey",       hex: "#6B7280" },
];

const CATEGORY_BG: Record<string, string> = {
  "top-bottom": "bg-amber-50",
  magnet: "bg-blue-50",
  drawer: "bg-pink-50",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, profile, loading: authLoading, supabase } = useAuth();
  const id = params?.id as string;

  const [product, setProduct]             = useState<Product | null>(null);
  const [related, setRelated]             = useState<Product[]>([]);
  const [loading, setLoading]             = useState(true);
  const [activeImage, setActiveImage]     = useState<string>("");

  const [selectedColor, setSelectedColor] = useState<string>(PRESET_COLORS[0].hex);
  const [customHex, setCustomHex]         = useState<string>("");
  const [isCustom, setIsCustom]           = useState(false);
  const [qty, setQty]                     = useState(1);
  const [orderState, setOrderState]       = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderError, setOrderError]       = useState("");
  const [orderNotes, setOrderNotes]       = useState("");
  const [paperType, setPaperType]         = useState<"standard" | "premium">("standard");

  useEffect(() => {
    async function fetchProductData() {
      if (!id) return;
      setLoading(true);
      
      try {
        const { data: prodData, error } = await supabasePublic.from("products").select("*").eq("id", id).single();
        if (error) throw error;
        
        if (prodData) {
          setProduct(prodData);
          setActiveImage(prodData.image);
          
          // Fetch related products
          const { data: relData } = await supabasePublic
            .from("products")
            .select("*")
            .eq("categorySlug", prodData.categorySlug)
            .neq("id", id)
            .limit(4);
            
          if (relData) {
            setRelated(relData);
          }
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProductData();
  }, [id]);

  const activeColor = isCustom ? (customHex.startsWith("#") ? customHex : `#${customHex}`) : selectedColor;
  const activeColorLabel = isCustom
    ? `Custom (${activeColor})`
    : PRESET_COLORS.find((c) => c.hex === selectedColor)?.label ?? selectedColor;
  
  const unitPrice = (product?.price ?? 0) + (paperType === "premium" ? 20 : 0);
  const totalPrice = unitPrice * qty;

  // Checkout Details State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [checkoutStep, setCheckoutStep] = useState<"shipping" | "payment">("shipping");
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>("");

  // Sync profile name and initial data when loaded
  useEffect(() => {
    if (profile) {
      setCheckoutData(prev => ({
        ...prev,
        name: profile.full_name || prev.name
      }));
    }
  }, [profile]);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  function handleCustomHexChange(val: string) {
    const cleaned = val.replace(/[^0-9a-fA-F#]/g, "").slice(0, 7);
    setCustomHex(cleaned);
    setIsCustom(true);
  }

  const handleRazorpayPayment = async () => {
    if (!user) { router.push("/auth/login"); return; }
    if (!product) return;
    
    // Check custom color MOQ
    if (isCustom && qty < 1000) {
      setOrderError("Minimum order quantity for custom colors is 1000 units.");
      return;
    }

    // Check if we have checkout data
    if (!checkoutData.address || !checkoutData.city || !checkoutData.pincode) {
      setShowCheckout(true);
      return;
    }

    setOrderState("loading");
    setOrderError("");

    try {
      const response = await fetch('/api/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          product_id: product.id,
          quantity: qty,
          color: selectedColor,
          size: product.size,
          paper_type: paperType,
          notes: orderNotes,
          checkoutData,
          user_id: user.id,
          user_email: user.email
        }),
      });

      const orderData = await response.json();

      if (orderData.error) {
        throw new Error(orderData.details || orderData.error);
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Precious Packaging",
        description: `Order for ${product.description}`,
        image: product.image,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // Verify signature on backend first
            const verifyRes = await fetch('/api/verify-razorpay-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                supabase_order_id: orderData.supabase_order_id,
              }),
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyData.verified) {
              setOrderState("success");
              // Wait 3 seconds to show success message and optionally redirect
              setTimeout(() => {
                setShowCheckout(false);
                setCheckoutStep("shipping");
                setOrderState("idle");
              }, 3000);
            } else {
              throw new Error(verifyData.error || "Payment verification failed.");
            }
          } catch (verifyError: any) {
            setOrderError(verifyError.message || "Failed to verify your payment. Please contact support.");
            setOrderState("error");
          }
        },
        prefill: {
          name: checkoutData.name,
          email: user?.email || "",
        },
        theme: {
          color: "#2E7D32",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setOrderError(response.error.description);
        setOrderState("error");
      });
      rzp.open();
    } catch (err: any) {
      setOrderError(err.message || "Failed to initiate payment");
      setOrderState("error");
    } finally {
      if (orderState !== "success") {
        setOrderState("idle");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream gap-4">
        <div className="w-8 h-8 border-4 border-brand-dark-brown/20 border-t-brand-dark-brown rounded-full animate-spin" />
        <p className="text-brand-dark-brown font-normal tracking-widest text-sm uppercase">Loading Product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream gap-4">
        <p className="text-2xl font-semibold text-brand-dark-brown">Product not found</p>
        <Link href="/products" className="text-sm text-brand-dark-brown/60 hover:text-brand-dark-brown underline underline-offset-4">
          ← Back to Products
        </Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-brand-cream font-sans">

      {/* ── Sticky header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream/95 backdrop-blur-sm border-b border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => router.back()} className="text-brand-charcoal/60 hover:text-brand-charcoal text-sm font-medium transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex-1" />
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply" />
            <span className="font-serif font-medium tracking-wide text-xl sm:text-2xl text-brand-charcoal group-hover:opacity-80 transition-opacity">
              Precious<span className="text-brand-charcoal/70">Packaging</span>
            </span>
          </Link>
          <div className="flex-1" />
          <Link href="/products" className="hidden sm:block text-brand-charcoal/50 hover:text-brand-charcoal text-xs font-medium transition-colors">
            All Products
          </Link>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="pt-16 bg-brand-dark-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-2 text-xs text-white/40 font-medium">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white/70 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white/80">{product.description}</span>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">

          {/* ── LEFT: Image gallery ── */}
          <div className="flex flex-col gap-4">
            {/* Primary image */}
            <div className={`relative aspect-square rounded-3xl overflow-hidden ${CATEGORY_BG[product.categorySlug]} flex items-center justify-center`}
              style={isCustom || selectedColor !== PRESET_COLORS[0].hex
                ? { boxShadow: `inset 0 0 0 4px ${activeColor}20` }
                : {}
              }
            >
              <Image
                src={activeImage || product.image}
                alt={product.description}
                fill
                className="object-contain p-12 drop-shadow-2xl transition-all duration-500"
                priority
              />
              {product.badge && (
                <div className="absolute top-5 left-5 bg-brand-dark-brown text-white text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {[product.image, ...(product.images || [])].map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden ${CATEGORY_BG[product.categorySlug]} cursor-pointer border-2 transition-all duration-200 ${activeImage === img ? "border-brand-dark-brown scale-95 shadow-inner" : "border-transparent hover:border-brand-dark-brown/40"}`}
                >
                  <Image
                    src={img}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-contain p-2 drop-shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details & actions ── */}
          <div className="flex flex-col gap-7">

            {/* Category tag + name */}
            <div>
              <p className="text-xs font-normal text-brand-dark-brown/40 uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-4xl sm:text-5xl font-semibold text-brand-dark-brown leading-tight tracking-tight">
                {product.description}
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">Size: <span className="text-brand-dark-brown font-normal">{product.size} cm</span></p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <p className="text-5xl font-semibold text-brand-dark-brown">₹{unitPrice}</p>
              <p className="text-sm text-gray-400 font-medium mb-2">per piece <span className="text-xs">(+5% GST)</span></p>
            </div>

            {/* Description */}
            <div className="bg-brand-cream rounded-2xl p-5 border border-gray-100">
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-400 mb-3">About this box</h2>
              <p className="text-brand-dark-brown/80 text-sm leading-relaxed">
                Premium {product.category.toLowerCase()} crafted for jewellery packaging. Includes full-colour screen printing of your logo or branding. 
                Perfect for <strong>{product.description}</strong> — available in {product.size} cm dimensions. 
                FSC-certified materials, eco-friendly production. Lead time: 15 working days.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["FSC Certified", "Screen Print Included", "Premium Finish", "Eco Friendly"].map((tag) => (
                  <span key={tag} className="text-[10px] font-normal uppercase tracking-wider text-brand-dark-brown/60 bg-brand-dark-brown/5 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Paper Type selector ── */}
            <div>
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-400 mb-3">Paper Quality</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaperType("standard")}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all text-left ${
                    paperType === "standard" 
                      ? "border-brand-dark-brown bg-brand-dark-brown/5" 
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <p className="text-xs font-semibold text-brand-dark-brown uppercase tracking-wider">Standard Paper</p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight">Included in base price</p>
                </button>
                <button
                  onClick={() => setPaperType("premium")}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all text-left ${
                    paperType === "premium" 
                      ? "border-brand-dark-brown bg-brand-dark-brown/5" 
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-xs font-semibold text-brand-dark-brown uppercase tracking-wider">Premium Paper</p>
                    <span className="text-[9px] bg-brand-brown text-white px-1.5 py-0.5 rounded-sm">+₹20</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-tight">Luxurious texture & finish</p>
                </button>
              </div>
            </div>

            {/* ── Colour selector ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-normal uppercase tracking-widest text-gray-400">Box Colour</h2>
                <span className="text-xs font-semibold text-brand-dark-brown flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 inline-block"
                    style={{ backgroundColor: activeColor }}
                  />
                  {activeColorLabel}
                </span>
              </div>

              {/* Preset swatches */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    title={c.label}
                    onClick={() => { setSelectedColor(c.hex); setIsCustom(false); }}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none ${
                      !isCustom && selectedColor === c.hex
                        ? "border-brand-dark-brown scale-110 shadow-lg"
                        : "border-white shadow"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              {/* Custom hex input */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2 flex-1 transition-all ${isCustom ? "border-brand-dark-brown" : "border-gray-200"} bg-brand-cream`}>
                  <span className="text-sm font-normal text-gray-400">#</span>
                  <input
                    type="text"
                    placeholder="Custom hex e.g. FF6B6B"
                    maxLength={7}
                    value={customHex.replace(/^#/, "")}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    onFocus={() => setIsCustom(true)}
                    className="flex-1 text-sm font-semibold text-brand-dark-brown bg-transparent outline-none placeholder:text-gray-300"
                  />
                  {isCustom && customHex && (
                    <span
                      className="w-6 h-6 rounded-full border border-black/10 flex-shrink-0"
                      style={{ backgroundColor: activeColor }}
                    />
                  )}
                </div>
                <div className="relative">
                  <input
                    type="color"
                    value={isCustom ? activeColor : selectedColor}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
              </div>
              {isCustom && (
                <div className="mt-3 flex items-center gap-2 bg-amber-50 border border-amber-100 p-3 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-800">
                    Custom Color MOQ: <span className="text-brand-dark-brown">1000 Units</span>
                  </p>
                </div>
              )}
            </div>

            {/* ── Quantity selector ── */}
            <div>
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-400 mb-3">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-brand-cream flex items-center justify-center text-xl font-semibold text-brand-dark-brown hover:border-brand-dark-brown transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-28 text-center border-2 border-gray-200 rounded-xl h-11 font-semibold text-brand-dark-brown text-base focus:border-brand-dark-brown outline-none transition-colors"
                />
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-brand-cream flex items-center justify-center text-xl font-semibold text-brand-dark-brown hover:border-brand-dark-brown transition-colors"
                >
                  +
                </button>
                <div className="ml-2 text-sm text-gray-400 font-medium">
                  = <span className="text-brand-dark-brown font-semibold">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* ── Order Notes ── */}
            <div>
              <h2 className="text-xs font-normal uppercase tracking-widest text-gray-400 mb-3">Order Notes <span className="text-brand-dark-brown/40 normal-case font-medium">(Optional)</span></h2>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="E.g., Custom logo details, preferred colors, specific delivery instructions..."
                className="w-full bg-brand-cream border-2 border-gray-200 text-brand-dark-brown rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-dark-brown transition-colors resize-none h-24 placeholder:text-gray-400"
              />
            </div>

            {/* ── CTA buttons ── */}
            {orderState === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {orderError || "Something went wrong. Please try again."}
              </div>
            )}
            {orderState === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
                <span>✓ Order placed successfully!</span>
                <Link href="/orders" className="font-normal underline text-green-800">View Orders →</Link>
              </div>
            )}
            {orderError && (
              <div className="mb-4 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-medium animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {orderError}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (isCustom && qty < 1000) {
                    setOrderError("Minimum order quantity for custom colors is 1000 units.");
                    // Scroll to error if needed or just let it show
                  } else {
                    setOrderError("");
                    setShowCheckout(true);
                  }
                }}
                disabled={orderState === "loading" || orderState === "success"}
                className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                  orderState === "success"
                    ? "bg-green-500 text-white"
                    : "bg-brand-dark-brown text-white hover:bg-[#163a5f] active:scale-[0.98]"
                }`}
              >
                {orderState === "loading" ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Placing Order…</>
                ) : orderState === "success" ? (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> Order Placed!</>
                ) : (
                  <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> {user ? "Place Order" : "Login to Order"}</>
                )}
              </button>
            </div>

            {/* Meta info strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🌿", label: "FSC Certified" },
                { icon: "🖨️", label: "Print Included" },
                { icon: "🚚", label: "15-Day Lead" },
              ].map((m) => (
                <div key={m.label} className="bg-brand-cream border border-gray-100 rounded-2xl p-3 text-center">
                  <div className="text-xl mb-1">{m.icon}</div>
                  <p className="text-[10px] font-normal uppercase tracking-wider text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-brand-dark-brown tracking-tight">More in {product.category}</h2>
              <div className="h-0.5 w-12 bg-brand-dark-brown mt-2 rounded-full" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link href={`/products/${p.id}`} key={p.id}>
                  <div className="bg-[#F5F3EE] rounded-2xl p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className={`relative aspect-square rounded-xl overflow-hidden ${CATEGORY_BG[p.categorySlug]} mb-3`}>
                      <Image src={p.image} alt={p.description} fill className="object-contain p-4 drop-shadow-md" />
                    </div>
                    <p className="text-[10px] font-normal text-gray-400 uppercase tracking-widest mb-0.5">{p.size} cm</p>
                    <h3 className="font-semibold text-brand-dark-brown text-sm leading-tight">{p.description}</h3>
                    <p className="text-brand-dark-brown font-semibold text-base mt-1">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-brand-dark-brown text-white/30 py-5 text-center text-xs mt-16">
        © {new Date().getFullYear()} PreciousPackaging. All rights reserved.
      </footer>

      {/* ── Checkout Modal ── */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-dark-brown/60 backdrop-blur-sm"
            onClick={() => setShowCheckout(false)}
          />
          <div className="relative w-full max-w-lg bg-brand-cream rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-brand-dark-brown tracking-tight">Shipping Details</h2>
                  <p className="text-xs text-gray-400 font-normal uppercase tracking-widest mt-1">Final Step</p>
                </div>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {checkoutStep === "shipping" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Recipient Name</label>
                      <input 
                        type="text"
                        placeholder="Full Name"
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-dark-brown focus:bg-brand-cream rounded-xl px-4 py-3 text-sm font-normal text-brand-dark-brown outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Full Address</label>
                      <textarea 
                        placeholder="Street, Building, Landmark..."
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-dark-brown focus:bg-brand-cream rounded-xl px-4 py-3 text-sm font-normal text-brand-dark-brown outline-none transition-all h-24 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">City</label>
                        <input 
                          type="text"
                          placeholder="E.g. Mumbai"
                          value={checkoutData.city}
                          onChange={(e) => setCheckoutData({...checkoutData, city: e.target.value})}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-dark-brown focus:bg-brand-cream rounded-xl px-4 py-3 text-sm font-normal text-brand-dark-brown outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">Pincode</label>
                        <input 
                          type="text"
                          placeholder="6 Digits"
                          maxLength={6}
                          value={checkoutData.pincode}
                          onChange={(e) => setCheckoutData({...checkoutData, pincode: e.target.value})}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-dark-brown focus:bg-brand-cream rounded-xl px-4 py-3 text-sm font-normal text-brand-dark-brown outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5 ml-1">State</label>
                      <input 
                        type="text"
                        placeholder="E.g. Maharashtra"
                        value={checkoutData.state}
                        onChange={(e) => setCheckoutData({...checkoutData, state: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-dark-brown focus:bg-brand-cream rounded-xl px-4 py-3 text-sm font-normal text-brand-dark-brown outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => setCheckoutStep("payment")}
                      disabled={!checkoutData.name || !checkoutData.address || !checkoutData.city || !checkoutData.pincode}
                      className="w-full py-4 bg-brand-dark-brown text-white rounded-xl font-semibold uppercase tracking-widest text-sm hover:bg-brand-green transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-brand-dark-brown/20"
                    >
                      Continue to Payment
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <p className="text-center text-brand-dark-brown/30 text-[10px] font-normal uppercase tracking-widest mt-4">Step 1 of 2: Shipping</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-normal text-gray-400 uppercase tracking-widest">Payable Amount</span>
                      <span className="text-xl font-semibold text-brand-dark-brown">₹{(totalPrice * 1.05).toLocaleString("en-IN")}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                      {paperType === "premium" ? "Premium Paper (+₹20) · " : ""}
                      Includes 5% GST
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3 ml-1">Secure Payment via Razorpay</label>
                    <div className="bg-brand-cream border-2 border-brand-dark-brown/10 rounded-2xl p-6 text-center">
                      <div className="mb-4 flex justify-center gap-4 opacity-50">
                        {/* Placeholder for UPI icons/Logos if you want to show them decorative */}
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-semibold text-[8px]">UPI</div>
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-semibold text-[8px]">CARD</div>
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-semibold text-[8px]">NET</div>
                      </div>
                      <p className="text-xs font-normal text-brand-dark-brown/60 mb-6">Support for UPI, Debit/Credit Cards & Netbanking</p>
                      
                      <button
                        onClick={handleRazorpayPayment}
                        disabled={orderState === "loading"}
                        className="w-full py-4 bg-brand-dark-brown text-white rounded-xl font-semibold uppercase tracking-widest text-sm hover:bg-brand-green transition-all flex items-center justify-center gap-3 shadow-md shadow-brand-dark-brown/20"
                      >
                        {orderState === "loading" ? (
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        ) : (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V10h16v8zm0-10H4V6h16v2z"/></svg>
                        )}
                        Open Payment Portal
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    {orderError && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-normal animate-in fade-in slide-in-from-top-2">
                        Error: {orderError}
                      </div>
                    )}
                    
                    {orderState === "success" ? (
                      <div className="text-center py-4 animate-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-lg font-semibold text-brand-dark-brown">Success!</h3>
                        <p className="text-xs text-gray-500 mt-1">Ordering placing...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <button 
                          onClick={() => setCheckoutStep("shipping")}
                          className="w-full py-2 text-gray-400 font-normal uppercase tracking-widest text-[10px] hover:text-brand-dark-brown transition-colors"
                        >
                          Back to Shipping
                        </button>
                      </div>
                    )}
                    <p className="text-center text-brand-dark-brown/30 text-[10px] font-normal uppercase tracking-widest mt-4">Safe & Secure Payments</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
