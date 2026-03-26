"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { supabasePublic } from "@/lib/supabase";
import { Heart, Search, Eye } from "lucide-react";

// ─── DATA & ICONS ─────────────────────────────────────────────────────────────

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
  { 
    slug: "all", 
    label: "VIEW ALL",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1" />
      </svg>
    ) 
  },
  { 
    slug: "top-bottom", 
    label: "TOP & BOTTOM SET",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="18" r="5" stroke="currentColor" strokeWidth="1" />
        <circle cx="25" cy="18" r="5" stroke="currentColor" strokeWidth="1" />
        <path d="M15 23 L 15 28 M25 23 L 25 28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="15" cy="30" r="2" fill="currentColor" />
        <circle cx="25" cy="30" r="2" fill="currentColor" />
      </svg>
    )
  },
  { 
    slug: "magnet", 
    label: "MAGNET BOX",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="14" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="1" />
        <rect x="20" y="18" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="1" />
        <path d="M18 18 L 22 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    )
  },
  { 
    slug: "drawer", 
    label: "DRAWER BOX",
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="14" width="20" height="10" stroke="currentColor" strokeWidth="1" />
        <path d="M12 24 L 10 30 L 30 30 L 28 24" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="20" cy="27" r="1.5" fill="currentColor" />
      </svg>
    )
  },
];

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="bg-transparent flex flex-col group">
      
      {/* ── Image container ── */}
      <Link href={`/products/${product.id}`} className="block relative focus:outline-none">
        
        <div className="relative aspect-square w-full bg-[#eeeae6] rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg">
          
          <Image
            src={product.image}
            alt={product.description}
            fill
            className="object-contain p-3 sm:p-6 transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
          />

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); setWishlisted((w) => !w); }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 bg-white/90 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-white z-10 border border-black/5"
            aria-label="Add to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
          </button>

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#8b7355] text-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-widest z-10 uppercase">
              {product.badge}
            </span>
          )}

          {/* Quick View Hover Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-[#3a352f]/90 text-[#f5f0eb] flex divide-x divide-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
            <div className="flex-1 py-1.5 flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-black/20 transition-colors cursor-pointer text-[8px] sm:text-[10px] uppercase font-bold tracking-widest leading-none">
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Quick View</span>
            </div>
            <div className="flex-1 py-1.5 flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-black/20 transition-colors cursor-pointer text-[8px] sm:text-[10px] uppercase font-bold tracking-widest leading-none">
              <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Details</span>
            </div>
          </div>

        </div>
      </Link>

      {/* ── Info container ── */}
      <div className="flex flex-col gap-1 sm:gap-2 pt-3 sm:pt-4 flex-1">
        
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-serif font-medium text-[#1a1a1a] leading-tight sm:leading-snug tracking-wide group-hover:text-[#8b7355] transition-colors uppercase">
            {product.description}
          </h3>
        </Link>
        
        <div className="flex flex-col mt-auto pb-1">
          <p className="text-xs sm:text-sm font-serif text-[#1a1a1a] tracking-wider mb-0.5 sm:mb-1">
            ₹{product.price} <span className="text-[10px] sm:text-[11px] text-gray-500 font-sans tracking-normal">/ Unit</span>
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-widest font-semibold">MOQ: 300</p>
        </div>

        {/* Color Swatches (Placeholders) & Add to Cart */}
        <div className="flex items-center justify-between mt-1 h-7">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] bg-[#222222] shadow-sm border border-black/10 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[#8b7355] transition-all"></div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] bg-[#4a0e1b] shadow-sm border border-black/10 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[#8b7355] transition-all"></div>
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] bg-[#d2c9c2] shadow-sm border border-black/10 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-[#8b7355] transition-all"></div>
          </div>

          <button
            onClick={handleAdd}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 whitespace-nowrap rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest font-bold transition-all duration-300 border ${
              added
                ? "bg-[#6c8b55] text-white border-[#6c8b55]"
                : "bg-white text-[#8b7355] border-[#8b7355]/40 hover:border-[#8b7355] hover:bg-[#faf8f5]"
            }`}
          >
            {added ? "✓ Added" : "+ Cart"}
          </button>
        </div>

      </div>
    </div>
  );
}


// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const router = useRouter();
  const { user, supabase } = useAuth();
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
    const catName = p.category.toUpperCase();
    if (!grouped[catName]) grouped[catName] = [];
    grouped[catName].push(p);
  });

  return (
    <div className="min-h-screen bg-[#FDFCF8]">

      {/* ─── Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8] border-b border-[#e5e0d8] shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply" />
            <span className="font-serif font-medium tracking-wide text-xl sm:text-2xl text-[#1a1a1a] group-hover:opacity-80 transition-opacity">
              Precious<span className="text-[#1a1a1a]/70">Packaging</span>
            </span>
          </Link>
          <div className="flex items-center gap-6 sm:gap-8 text-sm text-[#1a1a1a]">
            <Link href="/" className="hidden sm:block hover:text-[#8b7355] transition-colors">Home</Link>
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 hover:text-[#8b7355] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span>Cart</span>
              <span className="border border-[#e5e0d8] bg-[#FDFCF8] px-2 py-0.5 rounded-sm text-[11px] font-medium ml-1">
                {totalItems} items
              </span>
            </button>
            <Link href="/contact" className="hidden sm:flex items-center gap-1.5 hover:text-[#8b7355] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              Help
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero with Fabric Banner ─── */}
      <section className="pt-[72px] relative w-full overflow-hidden bg-[#0A1828]">
        {/* Fabric Background Image */}
        <div className="absolute inset-0 w-full h-full scale-105 opacity-80">
          <Image 
            src="/images/dark_navy_silk_bg.png" 
            alt="Luxury Fabric Background" 
            fill 
            className="object-cover"
            priority 
          />
        </div>
        
        {/* Dark overlay gradient to ensure text readability & blend edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1828]/60 via-transparent to-[#0A1828]/90"></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-16 pb-6 text-center text-[#FDFCF8]">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-wide mb-3 uppercase shadow-black/50 drop-shadow-md">
            Our Products
          </h1>
          <p className="text-[#FDFCF8]/80 text-sm sm:text-base max-w-lg mx-auto mb-16 font-light tracking-wide shadow-black/50 drop-shadow-sm">
            Bespoke Jewelry Packaging. Explore our curated collections.
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-14 pb-4">
            {CATEGORIES.map((c) => {
              const isActive = activeCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  onClick={() => setActiveCategory(c.slug)}
                  className={`flex flex-col items-center gap-3 transition-all duration-300 ${
                    isActive ? "text-[#FDFCF8] scale-105" : "text-[#FDFCF8]/50 hover:text-[#FDFCF8]/80"
                  }`}
                >
                  <div className="h-10 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <span className={`text-[10px] font-bold tracking-[0.15em] uppercase pb-1 border-b ${
                    isActive ? "border-[#FDFCF8]" : "border-transparent"
                  }`}>
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Products Area ─── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-8 h-8 border-[3px] border-[#8b7355]/20 border-t-[#8b7355] rounded-full animate-spin" />
            <p className="text-[#8b7355] font-serif tracking-widest text-xs uppercase">Loading Curations…</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-center text-gray-500 py-20 font-serif italic text-lg opacity-60">No collections found.</p>
        ) : (
          <div className="space-y-16">
            {Object.entries(grouped).map(([catName, cats]) => (
              <section key={catName} className="relative">
                
                {/* Elegant bounding container */}
                <div className="border border-[#e1d5c9] rounded-2xl bg-white p-6 sm:p-10 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] relative mt-8">
                  
                  {/* Section Title floating on border */}
                  <div className="absolute -top-[18px] left-6 sm:left-10 bg-[#FDFCF8] px-4 py-1 flex items-center gap-4">
                    <div className="w-6 h-[1px] bg-[#8b7355]/40" />
                    <h2 className="text-xl sm:text-2xl font-serif text-[#1a1a1a] tracking-widest">{catName}</h2>
                    <div className="w-6 h-[1px] bg-[#8b7355]/40" />
                  </div>

                  {/* Decorative inner corner flourishes (optional/subtle) */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#e1d5c9]/60 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#e1d5c9]/60 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#e1d5c9]/60 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#e1d5c9]/60 rounded-br-lg" />

                  {/* Product grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12">
                    {cats.map((p) => (
                      <ProductCard key={p.id} product={p} onAdd={handleAdd} />
                    ))}
                  </div>
                </div>

              </section>
            ))}
          </div>
        )}
      </main>

      {/* ─── Cart Drawer ─── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="w-full max-w-sm bg-[#FDFCF8] h-full shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-5 border-b border-[#e5e0d8] flex items-center justify-between">
              <h2 className="font-serif text-xl tracking-tight text-[#1a1a1a]">Your Cart {totalItems > 0 && `(${totalItems})`}</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-[#8b7355] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#e5e0d8] px-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 pb-20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  <p className="text-sm font-serif italic">Your cart is elegantly empty.</p>
                </div>
              ) : (
                cart.map(({ product, qty }) => (
                  <div key={product.id} className="py-5 flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-lg bg-[#eeeae6] flex-shrink-0 overflow-hidden border border-[#e1d5c9]/50">
                      <Image src={product.image} alt={product.description} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm leading-tight text-[#1a1a1a] truncate">{product.description}</p>
                      <p className="text-gray-400 text-xs mt-0.5 tracking-wider uppercase">{product.size} cm · {product.category}</p>
                      <p className="text-[#8b7355] font-medium text-sm mt-1">₹{product.price} × {qty}</p>
                    </div>
                    <button onClick={() => handleRemove(product.id)} className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100 p-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-[#e5e0d8] bg-white">
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between font-serif text-lg text-[#1a1a1a] font-bold tracking-wide">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-[#8b7355] mb-5 font-bold">+12% GST · Shipping calculated at checkout</p>

                <button
                  onClick={handleRequestQuote}
                  disabled={quoteState === "loading" || quoteState === "success"}
                  className="w-full bg-[#1a1a1a] text-[#FDFCF8] font-serif py-3.5 hover:bg-[#2a2a2a] transition-colors text-sm tracking-widest disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {user ? "PROCEED TO SECURE CHECKOUT" : "LOGIN TO CHECKOUT"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Footer Placeholder (Replaced by global footer outside page normally) ─── */}
    </div>
  );
}

