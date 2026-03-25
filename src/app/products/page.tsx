"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";

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
    <div className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 flex flex-col">

      {/* ── Image area ── */}
      <Link href={`/products/${product.id}`} className="block relative">
        <div className={`relative aspect-square w-full ${CATEGORY_BG[product.categorySlug]} overflow-hidden`}>
          <Image
            src={product.image}
            alt={product.description}
            fill
            className="object-contain p-8 transition-transform duration-700 group-hover:scale-108 drop-shadow-xl"
          />

          {/* Wishlist button — top right */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted((w) => !w); }}
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center transition-all hover:scale-110 z-10"
          >
            <svg
              className={`w-4 h-4 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Badge — top left */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-[#1a1a1a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider z-10">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* ── Info area ── */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Category + Size */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {CATEGORY_LABEL[product.categorySlug]}
          </span>
          <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {product.size} cm
          </span>
        </div>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-bold text-[#1a1a1a] leading-snug group-hover:text-[#0A2540] transition-colors">
            {product.description}
          </h3>
        </Link>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 leading-none mb-0.5">per piece</p>
            <p className="text-lg font-black text-[#1a1a1a]">₹{product.price}</p>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
              added
                ? "bg-green-500 text-white"
                : "bg-[#1a1a1a] text-white hover:bg-[#333]"
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}


// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const router = useRouter();
  const { user, loading: authLoading, supabase } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quoteState, setQuoteState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderNotes, setOrderNotes] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabasePublic.from("products").select("*").order("id", { ascending: true });
        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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
    alert("Bulk checkout is currently disabled for security upgrades. Please checkout items individually from their product pages.");
  };

  const filtered = products.filter((p) =>
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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-4 border-[#0A2540]/20 border-t-[#0A2540] rounded-full animate-spin" />
            <p className="text-[#0A2540] font-bold tracking-widest text-sm uppercase">Loading Catalog…</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found.</p>
        ) : (
          Object.entries(grouped).map(([catName, cats]) => (
            <section key={catName}>
              {/* Section heading */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">{catName}</h2>
                <div className="h-0.5 w-12 bg-[#0A2540] mt-2 rounded-full" />
              </div>

              {/* Product grid — 2 cols mobile, 3 on sm, 4 on lg */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {cats.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={handleAdd} />
                ))}
              </div>
            </section>
          ))
        )}

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

                {cart.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-[#0A2540] text-xs font-bold uppercase tracking-widest mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="E.g., Custom logo details, preferred colors, specific delivery instructions..."
                      className="w-full bg-gray-50 border border-gray-200 text-[#0A2540] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0A2540] transition-colors resize-none h-20 placeholder:text-gray-400"
                    />
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
                    user ? "Place Order" : "Login to Order"
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
