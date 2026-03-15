"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase";

// ─── Shared product data (mirrors products/page.tsx) ────────────────────────

type Product = {
  id: string;
  category: string;
  categorySlug: string;
  size: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

const ALL_PRODUCTS: Product[] = [
  // TOP & BOTTOM SET
  { id: "tb-1",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "2×2×2",         description: "Ring",                    price: 23,  image: "/images/category_rigid.png" },
  { id: "tb-2",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "2.5×3×1.5",     description: "Earring",                 price: 25,  image: "/images/category_rigid.png" },
  { id: "tb-3",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "3×3×1.5",       description: "Pendant / Multipurpose",  price: 30,  image: "/images/category_rigid.png" },
  { id: "tb-4",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "3.5×3.5×1.5",   description: "Multipurpose",            price: 35,  image: "/images/category_rigid.png" },
  { id: "tb-5",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "4×4×1.5",       description: "Bangle / Multipurpose",   price: 43,  image: "/images/category_rigid.png" },
  { id: "tb-6",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "5×4×1.5",       description: "Multipurpose",            price: 43,  image: "/images/category_rigid.png" },
  { id: "tb-7",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "7×2×1.5",       description: "Chain / Bracelet",        price: 43,  image: "/images/category_rigid.png" },
  { id: "tb-8",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "9×2×1.5",       description: "Chain",                   price: 45,  image: "/images/category_rigid.png" },
  { id: "tb-9",  category: "Top & Bottom Set", categorySlug: "top-bottom", size: "7×8×1.5",       description: "Medium Necklace",         price: 75,  image: "/images/category_rigid.png", badge: "Popular" },
  // MAGNET BOX
  { id: "mb-1",  category: "Magnet Box", categorySlug: "magnet", size: "2×2×2",         description: "Ring",                    price: 25,  image: "/images/product1.png" },
  { id: "mb-2",  category: "Magnet Box", categorySlug: "magnet", size: "2.5×3×1.5",     description: "Earring",                 price: 30,  image: "/images/product1.png" },
  { id: "mb-3",  category: "Magnet Box", categorySlug: "magnet", size: "3×3×1.5",       description: "Pendant / Multipurpose",  price: 35,  image: "/images/product1.png" },
  { id: "mb-4",  category: "Magnet Box", categorySlug: "magnet", size: "3.5×3.5×1.5",   description: "Multipurpose",            price: 40,  image: "/images/product1.png" },
  { id: "mb-5",  category: "Magnet Box", categorySlug: "magnet", size: "4×4×1.5",       description: "Bangle / Multipurpose",   price: 50,  image: "/images/product1.png" },
  { id: "mb-6",  category: "Magnet Box", categorySlug: "magnet", size: "5×4×1.5",       description: "Multipurpose",            price: 55,  image: "/images/product1.png" },
  { id: "mb-7",  category: "Magnet Box", categorySlug: "magnet", size: "6×7×1.5",       description: "Small Necklace",          price: 75,  image: "/images/product1.png" },
  { id: "mb-8",  category: "Magnet Box", categorySlug: "magnet", size: "7×8×1.5",       description: "Medium Necklace",         price: 85,  image: "/images/product1.png", badge: "Popular" },
  { id: "mb-9",  category: "Magnet Box", categorySlug: "magnet", size: "10×3×1.5",      description: "Big Chain",               price: 75,  image: "/images/product1.png" },
  { id: "mb-10", category: "Magnet Box", categorySlug: "magnet", size: "11×8×2",        description: "Full Set",                price: 160, image: "/images/product1.png", badge: "Premium" },
  // DRAWER BOX
  { id: "db-1",  category: "Drawer Box", categorySlug: "drawer", size: "2×2×2",         description: "Ring",                    price: 30,  image: "/images/category_mailer.png" },
  { id: "db-2",  category: "Drawer Box", categorySlug: "drawer", size: "2.5×3×1.5",     description: "Earring",                 price: 38,  image: "/images/category_mailer.png" },
  { id: "db-3",  category: "Drawer Box", categorySlug: "drawer", size: "3×3×1.5",       description: "Pendant / Multipurpose",  price: 40,  image: "/images/category_mailer.png" },
  { id: "db-4",  category: "Drawer Box", categorySlug: "drawer", size: "3.5×3.5×1.5",   description: "Multipurpose",            price: 45,  image: "/images/category_mailer.png" },
  { id: "db-5",  category: "Drawer Box", categorySlug: "drawer", size: "3.75×3.75×1.5", description: "Multipurpose",            price: 48,  image: "/images/category_mailer.png" },
  { id: "db-6",  category: "Drawer Box", categorySlug: "drawer", size: "4×4×2",         description: "Bangle / Multipurpose",   price: 55,  image: "/images/category_mailer.png" },
  { id: "db-7",  category: "Drawer Box", categorySlug: "drawer", size: "6×4",           description: "Multipurpose / Bangle",   price: 65,  image: "/images/category_mailer.png" },
  { id: "db-8",  category: "Drawer Box", categorySlug: "drawer", size: "9×2×1.5",       description: "Chain",                   price: 50,  image: "/images/category_mailer.png" },
  { id: "db-9",  category: "Drawer Box", categorySlug: "drawer", size: "7×8×1.5",       description: "Necklace",                price: 110, image: "/images/category_mailer.png", badge: "Popular" },
];

// ─── Preset colours ──────────────────────────────────────────────────────────

const PRESET_COLORS = [
  { label: "Midnight Black",   hex: "#1C1C1E" },
  { label: "Ivory White",      hex: "#F5F0E8" },
  { label: "Champagne Gold",   hex: "#C9A84C" },
  { label: "Rose Gold",        hex: "#B76E79" },
  { label: "Deep Navy",        hex: "#0A2540" },
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
  const { user } = useAuth();
  const supabase = createClient();
  const id = params?.id as string;

  const product = ALL_PRODUCTS.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState<string>(PRESET_COLORS[0].hex);
  const [customHex, setCustomHex]         = useState<string>("");
  const [isCustom, setIsCustom]           = useState(false);
  const [qty, setQty]                     = useState(300);
  const [orderState, setOrderState]       = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderError, setOrderError]       = useState("");

  // Related products (same category, excluding current)
  const related = product
    ? ALL_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 4)
    : [];

  const activeColor = isCustom ? (customHex.startsWith("#") ? customHex : `#${customHex}`) : selectedColor;
  const activeColorLabel = isCustom
    ? `Custom (${activeColor})`
    : PRESET_COLORS.find((c) => c.hex === selectedColor)?.label ?? selectedColor;

  function handleCustomHexChange(val: string) {
    const cleaned = val.replace(/[^0-9a-fA-F#]/g, "").slice(0, 7);
    setCustomHex(cleaned);
    setIsCustom(true);
  }

  async function handlePlaceOrder() {
    if (!user) { router.push("/auth/login"); return; }
    if (!product) return;
    setOrderState("loading");
    setOrderError("");
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      product_id: product.id,
      product_name: `${product.description} (${product.category})`,
      size: product.size,
      color: activeColor,
      quantity: qty,
      total_price: product.price * qty,
    });
    if (error) {
      setOrderState("error");
      setOrderError(error.message);
      setTimeout(() => setOrderState("idle"), 4000);
    } else {
      setOrderState("success");
      setTimeout(() => setOrderState("idle"), 4000);
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f9f9] gap-4">
        <p className="text-2xl font-black text-[#0A2540]">Product not found</p>
        <Link href="/products" className="text-sm text-[#0A2540]/60 hover:text-[#0A2540] underline underline-offset-4">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const totalPrice = product.price * qty;

  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans">

      {/* ── Sticky header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A2540]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <button onClick={() => router.back()} className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="flex-1" />
          <Link href="/" className="font-extrabold text-white tracking-tighter text-lg">PreciousPackaging</Link>
          <div className="flex-1" />
          <Link href="/products" className="hidden sm:block text-white/50 hover:text-white text-xs font-medium transition-colors">
            All Products
          </Link>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="pt-16 bg-[#0A2540]">
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
                src={product.image}
                alt={product.description}
                fill
                className="object-contain p-12 drop-shadow-2xl"
                priority
              />
              {product.badge && (
                <div className="absolute top-5 left-5 bg-[#0A2540] text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase shadow-lg">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail strip  — same image repeated at different opacities to simulate variants */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 0.65, 0.45, 0.3].map((op, i) => (
                <div
                  key={i}
                  className={`relative aspect-square rounded-2xl overflow-hidden ${CATEGORY_BG[product.categorySlug]} cursor-pointer border-2 transition-all duration-200 ${i === 0 ? "border-[#0A2540]" : "border-transparent hover:border-[#0A2540]/40"}`}
                >
                  <Image
                    src={product.image}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-contain p-4 drop-shadow-md"
                    style={{ opacity: op }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Details & actions ── */}
          <div className="flex flex-col gap-7">

            {/* Category tag + name */}
            <div>
              <p className="text-xs font-bold text-[#0A2540]/40 uppercase tracking-widest mb-2">{product.category}</p>
              <h1 className="text-4xl sm:text-5xl font-black text-[#0A2540] leading-tight tracking-tight">
                {product.description}
              </h1>
              <p className="text-sm text-gray-500 mt-2 font-medium">Size: <span className="text-[#0A2540] font-bold">{product.size} cm</span></p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <p className="text-5xl font-black text-[#0A2540]">₹{product.price}</p>
              <p className="text-sm text-gray-400 font-medium mb-2">per piece <span className="text-xs">(+12% GST)</span></p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">About this box</h2>
              <p className="text-[#0A2540]/80 text-sm leading-relaxed">
                Premium {product.category.toLowerCase()} crafted for jewellery packaging. Includes full-colour screen printing of your logo or branding. 
                Perfect for <strong>{product.description}</strong> — available in {product.size} cm dimensions. 
                FSC-certified materials, eco-friendly production. Lead time: 15 working days. MOQ: 300 pcs.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["FSC Certified", "Screen Print Included", "Premium Finish", "Eco Friendly"].map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-[#0A2540]/60 bg-[#0A2540]/5 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Colour selector ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">Box Colour</h2>
                <span className="text-xs font-semibold text-[#0A2540] flex items-center gap-1.5">
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
                        ? "border-[#0A2540] scale-110 shadow-lg"
                        : "border-white shadow"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>

              {/* Custom hex input */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 border-2 rounded-xl px-3 py-2 flex-1 transition-all ${isCustom ? "border-[#0A2540]" : "border-gray-200"} bg-white`}>
                  <span className="text-sm font-bold text-gray-400">#</span>
                  <input
                    type="text"
                    placeholder="Custom hex e.g. FF6B6B"
                    maxLength={7}
                    value={customHex.replace(/^#/, "")}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    onFocus={() => setIsCustom(true)}
                    className="flex-1 text-sm font-semibold text-[#0A2540] bg-transparent outline-none placeholder:text-gray-300"
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
                  <div className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Quantity selector ── */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Quantity <span className="text-[#0A2540]/40 normal-case font-medium">(min. 300 pcs)</span></h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty((q) => Math.max(300, q - 100))}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-black text-[#0A2540] hover:border-[#0A2540] transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min={300}
                  step={100}
                  value={qty}
                  onChange={(e) => setQty(Math.max(300, Number(e.target.value)))}
                  className="w-28 text-center border-2 border-gray-200 rounded-xl h-11 font-black text-[#0A2540] text-base focus:border-[#0A2540] outline-none transition-colors"
                />
                <button
                  onClick={() => setQty((q) => q + 100)}
                  className="w-11 h-11 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-black text-[#0A2540] hover:border-[#0A2540] transition-colors"
                >
                  +
                </button>
                <div className="ml-2 text-sm text-gray-400 font-medium">
                  = <span className="text-[#0A2540] font-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
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
                <Link href="/orders" className="font-bold underline text-green-800">View Orders →</Link>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePlaceOrder}
                disabled={orderState === "loading" || orderState === "success"}
                className={`flex-1 py-4 px-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                  orderState === "success"
                    ? "bg-green-500 text-white"
                    : "bg-[#0A2540] text-white hover:bg-[#163a5f] active:scale-[0.98]"
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
              <button className="flex-1 sm:flex-none py-4 px-6 rounded-2xl border-2 border-[#0A2540] text-[#0A2540] font-black text-sm uppercase tracking-widest hover:bg-[#0A2540] hover:text-white transition-all duration-200">
                Request Quote
              </button>
            </div>

            {/* Meta info strip */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: "🌿", label: "FSC Certified" },
                { icon: "🖨️", label: "Print Included" },
                { icon: "🚚", label: "15-Day Lead" },
              ].map((m) => (
                <div key={m.label} className="bg-white border border-gray-100 rounded-2xl p-3 text-center">
                  <div className="text-xl mb-1">{m.icon}</div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">More in {product.category}</h2>
              <div className="h-0.5 w-12 bg-[#0A2540] mt-2 rounded-full" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link href={`/products/${p.id}`} key={p.id}>
                  <div className="bg-[#F5F3EE] rounded-2xl p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className={`relative aspect-square rounded-xl overflow-hidden ${CATEGORY_BG[p.categorySlug]} mb-3`}>
                      <Image src={p.image} alt={p.description} fill className="object-contain p-4 drop-shadow-md" />
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{p.size} cm</p>
                    <h3 className="font-black text-[#0A2540] text-sm leading-tight">{p.description}</h3>
                    <p className="text-[#0A2540] font-black text-base mt-1">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#0A2540] text-white/30 py-5 text-center text-xs mt-16">
        © {new Date().getFullYear()} PreciousPackaging. All rights reserved.
      </footer>
    </div>
  );
}
