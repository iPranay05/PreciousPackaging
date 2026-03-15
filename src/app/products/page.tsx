"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { createClient } from "@/lib/supabase";

// ─── DATA ──────────────────────────────────────────────────────────────────────

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
  { id: "tb-1", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "2×2×2", description: "Ring", price: 23, image: "/images/category_rigid.png" },
  { id: "tb-2", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "2.5×3×1.5", description: "Earring", price: 25, image: "/images/category_rigid.png" },
  { id: "tb-3", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "3×3×1.5", description: "Pendant / Multipurpose", price: 30, image: "/images/category_rigid.png" },
  { id: "tb-4", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "3.5×3.5×1.5", description: "Multipurpose", price: 35, image: "/images/category_rigid.png" },
  { id: "tb-5", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "4×4×1.5", description: "Bangle / Multipurpose", price: 43, image: "/images/category_rigid.png" },
  { id: "tb-6", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "5×4×1.5", description: "Multipurpose", price: 43, image: "/images/category_rigid.png" },
  { id: "tb-7", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "7×2×1.5", description: "Chain / Bracelet", price: 43, image: "/images/category_rigid.png" },
  { id: "tb-8", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "9×2×1.5", description: "Chain", price: 45, image: "/images/category_rigid.png" },
  { id: "tb-9", category: "Top & Bottom Set", categorySlug: "top-bottom", size: "7×8×1.5", description: "Medium Necklace", price: 75, image: "/images/category_rigid.png", badge: "Popular" },
  // MAGNET BOX
  { id: "mb-1", category: "Magnet Box", categorySlug: "magnet", size: "2×2×2", description: "Ring", price: 25, image: "/images/product1.png" },
  { id: "mb-2", category: "Magnet Box", categorySlug: "magnet", size: "2.5×3×1.5", description: "Earring", price: 30, image: "/images/product1.png" },
  { id: "mb-3", category: "Magnet Box", categorySlug: "magnet", size: "3×3×1.5", description: "Pendant / Multipurpose", price: 35, image: "/images/product1.png" },
  { id: "mb-4", category: "Magnet Box", categorySlug: "magnet", size: "3.5×3.5×1.5", description: "Multipurpose", price: 40, image: "/images/product1.png" },
  { id: "mb-5", category: "Magnet Box", categorySlug: "magnet", size: "4×4×1.5", description: "Bangle / Multipurpose", price: 50, image: "/images/product1.png" },
  { id: "mb-6", category: "Magnet Box", categorySlug: "magnet", size: "5×4×1.5", description: "Multipurpose", price: 55, image: "/images/product1.png" },
  { id: "mb-7", category: "Magnet Box", categorySlug: "magnet", size: "6×7×1.5", description: "Small Necklace", price: 75, image: "/images/product1.png" },
  { id: "mb-8", category: "Magnet Box", categorySlug: "magnet", size: "7×8×1.5", description: "Medium Necklace", price: 85, image: "/images/product1.png", badge: "Popular" },
  { id: "mb-9", category: "Magnet Box", categorySlug: "magnet", size: "10×3×1.5", description: "Big Chain", price: 75, image: "/images/product1.png" },
  { id: "mb-10", category: "Magnet Box", categorySlug: "magnet", size: "11×8×2", description: "Full Set", price: 160, image: "/images/product1.png", badge: "Premium" },
  // DRAWER BOX
  { id: "db-1", category: "Drawer Box", categorySlug: "drawer", size: "2×2×2", description: "Ring", price: 30, image: "/images/category_mailer.png" },
  { id: "db-2", category: "Drawer Box", categorySlug: "drawer", size: "2.5×3×1.5", description: "Earring", price: 38, image: "/images/category_mailer.png" },
  { id: "db-3", category: "Drawer Box", categorySlug: "drawer", size: "3×3×1.5", description: "Pendant / Multipurpose", price: 40, image: "/images/category_mailer.png" },
  { id: "db-4", category: "Drawer Box", categorySlug: "drawer", size: "3.5×3.5×1.5", description: "Multipurpose", price: 45, image: "/images/category_mailer.png" },
  { id: "db-5", category: "Drawer Box", categorySlug: "drawer", size: "3.75×3.75×1.5", description: "Multipurpose", price: 48, image: "/images/category_mailer.png" },
  { id: "db-6", category: "Drawer Box", categorySlug: "drawer", size: "4×4×2", description: "Bangle / Multipurpose", price: 55, image: "/images/category_mailer.png" },
  { id: "db-7", category: "Drawer Box", categorySlug: "drawer", size: "6×4", description: "Multipurpose / Bangle", price: 65, image: "/images/category_mailer.png" },
  { id: "db-8", category: "Drawer Box", categorySlug: "drawer", size: "9×2×1.5", description: "Chain", price: 50, image: "/images/category_mailer.png" },
  { id: "db-9", category: "Drawer Box", categorySlug: "drawer", size: "7×8×1.5", description: "Necklace", price: 110, image: "/images/category_mailer.png", badge: "Popular" },
];

const CATEGORIES = [
  { slug: "all", label: "All" },
  { slug: "top-bottom", label: "Top & Bottom Set" },
  { slug: "magnet", label: "Magnet Box" },
  { slug: "drawer", label: "Drawer Box" },
];

const CATEGORY_BG: Record<string, string> = {
  "top-bottom": "bg-amber-50",
  magnet: "bg-blue-50",
  drawer: "bg-pink-50",
};

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

const CATEGORY_LABEL: Record<string, string> = {
  "top-bottom": "Top & Bottom",
  magnet: "Magnet Box",
  drawer: "Drawer Box",
};

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="bg-[#F5F3EE] rounded-3xl p-3 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col gap-3">

      {/* ── Top badge row ── */}
      <div className="flex items-center gap-2">
        <span className="bg-[#2C2C2C] text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider">
          {CATEGORY_LABEL[product.categorySlug]}
        </span>
        {product.badge ? (
          <span className="bg-white text-[#2C2C2C] text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-200 tracking-wider">
            {product.badge}
          </span>
        ) : (
          <span className="bg-white text-gray-400 text-[10px] font-medium px-3 py-1.5 rounded-full border border-gray-200">
            {product.size} cm
          </span>
        )}
      </div>

      {/* ── Image container (clickable → detail page) ── */}
      <Link href={`/products/${product.id}`} className="block">
        <div className={`relative rounded-2xl overflow-hidden ${CATEGORY_BG[product.categorySlug]} flex flex-col`}>
          {/* Product image */}
          <div className="relative aspect-[4/3.5] w-full">
            <Image
              src={product.image}
              alt={product.description}
              fill
              className="object-contain p-6 transition-transform duration-700 group-hover:scale-105 drop-shadow-lg"
            />
          </div>

          {/* ── Action bar at bottom of image ── */}
          <div className="flex items-center gap-2 px-3 pb-3">
            {/* Size chip */}
            <div className="flex-1 bg-white/80 backdrop-blur rounded-xl px-3 py-2 text-center">
              <p className="text-[9px] text-gray-400 font-medium leading-none mb-0.5 uppercase tracking-wider">Size</p>
              <p className="text-xs font-black text-[#0A2540] leading-none">{product.size}</p>
            </div>

            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); setWishlisted((w) => !w); }}
              className="w-10 h-10 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
            >
              <svg
                className={`w-4 h-4 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Add to cart */}
            <button
              onClick={(e) => { e.preventDefault(); handleAdd(); }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110 ${added ? "bg-green-500" : "bg-white/80 backdrop-blur"
                }`}
            >
              {added ? (
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* ── Name + Price (also clickable) ── */}
      <Link href={`/products/${product.id}`} className="block px-1 pb-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
              {product.category}
            </p>
            <h3 className="font-black text-[#0A2540] text-xl font-semibold leading-tight">{product.description}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] font-medium text-gray-400 mb-0.5">per piece</p>
            <p className="text-xl font-black text-[#0A2540] leading-none">₹{product.price}</p>
          </div>
        </div>
      </Link>

    </div>
  );
}


// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleAdd = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product, qty: 1 }];
    });
  };

  const handleRemove = (id: string) => setCart((prev) => prev.filter((i) => i.product.id !== id));

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  const handleRequestQuote = async () => {
    if (!user) { router.push("/auth/login"); return; }
    setQuoteState("loading");
    const rows = cart.map(({ product, qty }) => ({
      user_id: user.id,
      product_id: product.id,
      product_name: `${product.description} (${product.category})`,
      size: product.size,
      quantity: qty * 300, // qty in cart × MOQ
      total_price: product.price * qty * 300,
      color: null,
    }));
    const { error } = await supabase.from("orders").insert(rows);
    if (error) {
      setQuoteState("error");
      setTimeout(() => setQuoteState("idle"), 3000);
    } else {
      setQuoteState("success");
      setCart([]);
      setTimeout(() => { setQuoteState("idle"); setCartOpen(false); }, 2500);
    }
  };

  const filtered = ALL_PRODUCTS.filter((p) =>
    activeCategory === "all" || p.categorySlug === activeCategory
  );

  const grouped: Record<string, Product[]> = {};
  filtered.forEach((p) => {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  });

  return (
    <div className="min-h-screen bg-[#f9f9f9]">

      {/* ─── Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A2540]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="font-extrabold text-lg text-white tracking-tighter">
            PreciousPackaging
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden sm:block text-white/50 hover:text-white text-xs font-medium transition-colors">
              ← Home
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-white text-[#0A2540] font-bold px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="pt-16 bg-[#0A2540] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-3">Our Products</h1>
          <p className="text-white/50 text-sm sm:text-base max-w-md mb-8">
            Premium jewellery packaging. Prices include screen printing. MOQ 300 pcs · +12% GST.
          </p>
          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActiveCategory(c.slug)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${activeCategory === c.slug
                    ? "bg-white text-[#0A2540]"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {Object.keys(grouped).length === 0 && (
          <p className="text-center text-gray-400 py-20">No products found.</p>
        )}
        {Object.entries(grouped).map(([catName, products]) => (
          <section key={catName}>
            {/* Section heading */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">{catName}</h2>
              <div className="h-0.5 w-12 bg-[#0A2540] mt-2 rounded-full" />
            </div>

            {/* Product grid — 2 cols mobile, 3 on sm, 4 on lg */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={handleAdd} />
              ))}
            </div>
          </section>
        ))}

        {/* Order info */}
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 bg-white">
          <h3 className="font-black text-[#0A2540] text-base mb-4 uppercase tracking-widest text-xs">Order Information</h3>
          <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            {[
              ["MOQ", "300 pcs (standard) · 1000 pcs (colour-coded)"],
              ["Lead Time", "15 working days"],
              ["GST", "+12% on all orders"],
              ["Payment", "50% advance required"],
              ["Customisation", "Logo, foil colours, material finishes"],
              ["Returns", "Defective pieces only"],
            ].map(([dt, dd]) => (
              <div key={dt}>
                <dt className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-0.5">{dt}</dt>
                <dd className="text-[#0A2540] font-semibold">{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </main>

      {/* ─── Cart Drawer ─── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-[#0A2540]">Cart {totalItems > 0 && `(${totalItems})`}</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50 px-6">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-16 text-sm">Your cart is empty.</p>
              ) : (
                cart.map(({ product, qty }) => (
                  <div key={product.id} className="py-4 flex gap-3 items-center">
                    <div className={`relative w-14 h-14 rounded-xl ${CATEGORY_BG[product.categorySlug]} flex-shrink-0 overflow-hidden`}>
                      <Image src={product.image} alt={product.description} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-[#0A2540] text-sm leading-tight truncate">{product.description}</p>
                      <p className="text-gray-400 text-xs">{product.size} cm · {product.category}</p>
                      <p className="text-[#0A2540] font-bold text-sm mt-0.5">₹{product.price} × {qty}</p>
                    </div>
                    <button onClick={() => handleRemove(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-[#0A2540] font-black text-base">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <p className="text-xs text-gray-400">+12% GST · Shipping at checkout</p>

                {quoteState === "error" && (
                  <p className="text-red-500 text-xs font-medium">Something went wrong. Please try again.</p>
                )}
                {quoteState === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-3 py-2 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Order placed! <Link href="/orders" className="font-bold underline">View →</Link>
                  </div>
                )}

                <button
                  onClick={handleRequestQuote}
                  disabled={quoteState === "loading" || quoteState === "success"}
                  className="w-full bg-[#0A2540] text-white font-black py-4 rounded-xl hover:bg-[#163a5f] transition-colors text-sm uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {quoteState === "loading" ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order…</>
                  ) : quoteState === "success" ? (
                    "✓ Order Placed!"
                  ) : (
                    user ? "Request Quote" : "Login to Order"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-[#0A2540] text-white/30 py-5 text-center text-xs">
        © {new Date().getFullYear()} PreciousPackaging. All rights reserved.
      </footer>
    </div>
  );
}
