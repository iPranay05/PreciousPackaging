"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, ShoppingBag, Plus, Minus, Trash2, LogIn, LogOut, Package, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const { cart, removeFromCart, updateQty, cartOpen, setCartOpen } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);

  const handleCheckoutClick = () => {
    // Save cart state/details to pass to contact form
    setDrawerOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream border-b border-[#e5e0d8] shadow-sm h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between relative">
        
        {/* Left: Logo & Text Stack */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group z-10">
          <img 
            src="/images/image.png" 
            alt="PreciousPackaging Logo" 
            className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply" 
          />
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold text-brand-dark-brown text-base sm:text-xl leading-tight tracking-tight">
              PreciousPack
            </span>
            <span className="font-sans text-[7px] sm:text-[9px] uppercase tracking-widest text-brand-charcoal/60 leading-none mt-0.5">
              Premium Packaging Solutions
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-xs tracking-widest uppercase text-brand-charcoal/80 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="hover:text-brand-brown transition-colors">HOME</Link>
          
          {/* PRODUCTS Category Dropdown */}
          <div className="relative group py-4">
            <Link 
              href="/products" 
              className="flex items-center gap-1 hover:text-brand-brown transition-colors cursor-pointer"
            >
              PRODUCTS <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
            </Link>
            
            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-brand-cream border border-[#e5e0d8] rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50">
              <div className="py-2">
                {[
                  { name: "Top Bottom Set", slug: "top-bottom" },
                  { name: "Magnetic Box", slug: "magnet" },
                  { name: "Drawer Box", slug: "drawer" },
                  { name: "Handle Drawer", slug: "handle-drawer" },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="block px-4 py-2.5 text-[10px] font-semibold tracking-widest text-brand-charcoal/80 hover:bg-black/5 hover:text-brand-brown transition-colors"
                  >
                    {cat.name.toUpperCase()}
                  </Link>
                ))}
                <div className="border-t border-[#e5e0d8] my-1" />
                <Link
                  href="/products"
                  className="block px-4 py-2.5 text-[10px] font-bold tracking-widest text-brand-brown hover:bg-black/5 transition-colors"
                >
                  VIEW ALL PRODUCTS
                </Link>
              </div>
            </div>
          </div>

          <Link href="/contact?subject=Customization" className="hover:text-brand-brown transition-colors">CUSTOMIZATION</Link>
          <Link href="/#why-choose-us" className="hover:text-brand-brown transition-colors">ABOUT US</Link>
          <Link href="/#our-process" className="hover:text-brand-brown transition-colors">OUR PROCESS</Link>
          <Link href="/contact" className="hover:text-brand-brown transition-colors">CONTACT</Link>
        </nav>

        {/* Right: CTA & Hamburger Icon */}
        <div className="flex items-center gap-3 sm:gap-4 z-10">
          {/* GET QUOTE Button */}
          <Link
            href="/contact?subject=Quote"
            className="bg-brand-dark-brown text-[#FAF6F0] px-3 sm:px-6 py-1.5 sm:py-2.5 hover:bg-[#3d2a1f] transition-all rounded-md text-[9px] sm:text-[11px] font-semibold tracking-widest uppercase shadow-sm cursor-pointer"
          >
            GET QUOTE
          </Link>

          {/* Hamburger Menu Toggle (Desktop + Mobile) */}
          <button 
            onClick={() => setDrawerOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors relative cursor-pointer"
            aria-label="Toggle Drawer Menu"
          >
            <Menu size={22} className="text-brand-charcoal" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-brown text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Drawer Overlay (Backdrop) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />
          
          {/* Slide-out Drawer Panel */}
          <div className="relative ml-auto w-full max-w-md bg-brand-cream h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300 z-[110]">
            
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#e5e0d8] flex items-center justify-between bg-brand-cream/80 backdrop-blur-md sticky top-0 z-10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setDrawerOpen(false)}>
                <img 
                  src="/images/image.png" 
                  alt="PreciousPackaging Logo" 
                  className="h-8 w-auto object-contain mix-blend-multiply" 
                />
                <span className="font-serif font-bold text-brand-dark-brown text-base leading-tight tracking-tight">
                  PreciousPack
                </span>
              </Link>
              <button 
                onClick={() => setDrawerOpen(false)} 
                className="p-2 hover:bg-black/5 rounded-full text-brand-charcoal hover:text-brand-brown transition-colors cursor-pointer"
                aria-label="Close drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-8">
              
              {/* Navigation Links (Accordion for smaller screens or reference) */}
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-brand-charcoal/40 uppercase mb-4">NAVIGATE</h3>
                <nav className="flex flex-col gap-3 font-semibold text-xs tracking-widest uppercase text-brand-charcoal/80">
                  <Link href="/" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">HOME</Link>
                  <Link href="/products" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">PRODUCTS</Link>
                  <Link href="/contact?subject=Customization" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">CUSTOMIZATION</Link>
                  <Link href="/#why-choose-us" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">ABOUT US</Link>
                  <Link href="/#our-process" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">OUR PROCESS</Link>
                  <Link href="/contact" onClick={() => setDrawerOpen(false)} className="hover:text-brand-brown py-1 transition-colors">CONTACT</Link>
                </nav>
              </div>

              {/* Shopping Cart Section */}
              <div className="border-t border-[#e5e0d8] pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-bold tracking-widest text-brand-charcoal/40 uppercase">SHOPPING CART</h3>
                  {totalItems > 0 && (
                    <span className="text-xs font-serif text-brand-brown italic">({totalItems} items)</span>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-gray-400 gap-3">
                    <ShoppingBag size={32} className="stroke-[1.25]" />
                    <p className="text-xs font-serif italic">Your cart is elegantly empty.</p>
                    <Link 
                      href="/products" 
                      onClick={() => setDrawerOpen(false)}
                      className="text-[10px] uppercase font-bold tracking-widest text-brand-brown hover:text-brand-dark-brown transition-colors mt-2"
                    >
                      Browse Products →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Cart Items List */}
                    <div className="divide-y divide-[#e5e0d8] max-h-72 overflow-y-auto pr-1">
                      {cart.map(({ product, qty }) => (
                        <div key={product.id} className="py-3 flex gap-3 items-start group">
                          <div className="relative w-12 h-12 rounded-lg bg-[#eeeae6] flex-shrink-0 overflow-hidden border border-[#e1d5c9]/50">
                            <img src={product.image} alt={product.description} className="object-contain p-1 w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-xs font-semibold leading-tight text-brand-charcoal truncate">{product.description}</p>
                            <p className="text-gray-400 text-[9px] mt-0.5 tracking-wider uppercase">{product.size} cm · {product.category}</p>
                            <p className="text-brand-brown font-medium text-xs mt-1">₹{product.price} / unit</p>
                            
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 mt-2">
                              <button 
                                onClick={() => updateQty(product.id, qty - 1)}
                                className="w-5 h-5 rounded-full border border-[#e1d5c9] flex items-center justify-center hover:bg-black/5 text-brand-charcoal transition-colors cursor-pointer"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-semibold text-brand-charcoal w-4 text-center">{qty}</span>
                              <button 
                                onClick={() => updateQty(product.id, qty + 1)}
                                className="w-5 h-5 rounded-full border border-[#e1d5c9] flex items-center justify-center hover:bg-black/5 text-brand-charcoal transition-colors cursor-pointer"
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(product.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Subtotal & Request Button */}
                    <div className="border-t border-[#e5e0d8] pt-4 mt-2">
                      <div className="flex items-center justify-between font-serif text-base text-brand-charcoal font-semibold">
                        <span>Est. Subtotal</span>
                        <span>₹{totalPrice}</span>
                      </div>
                      <p className="text-[9px] uppercase tracking-widest text-brand-brown/70 mt-0.5 mb-4">+5% GST · Delivery extra</p>

                      <Link
                        href={`/contact?subject=Checkout&details=${encodeURIComponent(
                          cart.map(i => `${i.product.description} (Qty: ${i.qty})`).join(", ")
                        )}`}
                        onClick={handleCheckoutClick}
                        className="w-full py-3 rounded-lg bg-brand-brown text-white text-[11px] font-bold uppercase tracking-widest hover:bg-brand-dark-brown transition-colors shadow-sm flex items-center justify-center gap-2"
                      >
                        REQUEST CUSTOM QUOTE →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account / Profile Section */}
              <div className="border-t border-[#e5e0d8] pt-6 mt-auto">
                <h3 className="text-[10px] font-bold tracking-widest text-brand-charcoal/40 uppercase mb-4">MY ACCOUNT</h3>
                
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="text-xs text-brand-charcoal font-semibold bg-brand-beige/35 px-4 py-2.5 rounded-lg border border-[#e5e0d8]">
                      👋 Welcome, <span className="text-brand-brown">{profile?.full_name ?? user.email}</span>
                    </div>
                    <Link 
                      href="/orders" 
                      onClick={() => setDrawerOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-brand-charcoal/80 text-xs font-semibold hover:bg-black/5 hover:text-brand-brown rounded-md transition-all"
                    >
                      <Package size={16} /> My Orders
                    </Link>
                    {profile?.is_admin && (
                      <Link 
                        href="/admin" 
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-brand-brown text-xs font-bold hover:bg-black/5 hover:text-brand-dark-brown rounded-md transition-all"
                      >
                        <LayoutDashboard size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={() => { signOut(); setDrawerOpen(false); }}
                      className="flex items-center gap-2.5 px-3 py-2 text-red-500 text-xs font-semibold hover:bg-black/5 rounded-md transition-all text-left w-full cursor-pointer mt-1"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth/login" 
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    <LogIn size={14} /> LOGIN / REGISTER
                  </Link>
                )}
              </div>

            </div>

          </div>
        </div>
      )}
    </header>
  );
}
