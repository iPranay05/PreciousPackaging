"use client";

import Link from "next/link";
import { ShoppingBag, Menu, LogIn, LogOut, Package, LayoutDashboard, ChevronDown, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream border-b border-[#e5e0d8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-1 sm:gap-4">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-1.5 -ml-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <Menu size={22} className="text-brand-charcoal" />
          </button>
          <Link href="/" className="flex items-center gap-1.5 sm:gap-3 group">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-8 sm:h-12 w-auto object-contain mix-blend-multiply" />
            <span className="font-serif font-medium tracking-tight text-base sm:text-2xl text-brand-charcoal group-hover:opacity-80 transition-opacity">
              Precious<span className="text-brand-charcoal/70">Packaging</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-normal text-xs tracking-widest uppercase text-brand-charcoal/80 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/#featured" className="hover:text-brand-brown transition-opacity">BEST SELLERS</Link>
          <Link href="/#categories" className="hover:text-brand-brown transition-opacity">CATEGORIES</Link>
          <Link href="/products" className="hover:text-brand-brown transition-opacity">PRODUCTS</Link>
          <Link href="/#faq" className="hover:text-brand-brown transition-opacity">FAQ</Link>
        </nav>

        {/* Right: Auth + Cart */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {user ? (
            /* Logged-in user dropdown */
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-brand-charcoal text-xs sm:text-sm font-semibold"
              >
                <span className="max-w-[80px] sm:max-w-[120px] truncate">
                  {profile?.full_name?.split(' ')[0] ?? 'User'}
                </span>
                <ChevronDown size={12} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-cream border border-[#e5e0d8] rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    href="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-brand-charcoal/80 hover:bg-black/5 text-sm transition-colors"
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-brand-brown hover:bg-black/5 text-sm transition-colors font-semibold"
                    >
                      <LayoutDashboard size={15} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-black/5 text-sm transition-colors w-full"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out: Login button */
            <Link
              href="/auth/login"
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-black/10 text-brand-charcoal text-[11px] sm:text-sm font-semibold hover:bg-black/5 transition-colors"
            >
              <LogIn size={13} className="sm:w-[14px]" /> Login
            </Link>
          )}

          <button className="p-1.5 sm:p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <ShoppingBag size={18} className="text-brand-charcoal sm:w-[20px]" />
            <span className="absolute top-0.5 right-0.5 bg-brand-brown text-white text-[9px] font-normal w-3.5 h-3.5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[85%] max-w-sm bg-brand-cream h-full flex flex-col shadow-2xl transition-transform animate-in slide-in-from-left duration-300">
            <div className="p-4 flex items-center justify-between border-b border-[#e5e0d8]">
              <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
                <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-8 w-auto object-contain mix-blend-multiply" />
                <span className="font-serif font-medium tracking-wide text-lg text-brand-charcoal">
                  Precious<span className="text-brand-charcoal/70">Packaging</span>
                </span>
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} className="text-brand-charcoal" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-8 font-normal text-sm tracking-widest uppercase text-brand-charcoal">
              <Link href="/#featured" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-brown">BEST SELLERS</Link>
              <Link href="/#categories" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-brown">CATEGORIES</Link>
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-brown">PRODUCTS</Link>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-brown">FAQ</Link>
            </nav>
            
            <div className="p-6 border-t border-[#e5e0d8] bg-brand-beige/30">
              {user ? (
                <div className="flex flex-col gap-5">
                  <div className="font-semibold text-brand-charcoal text-sm truncate bg-white/50 px-4 py-2 rounded-lg">
                    👋 {profile?.full_name ?? user.email}
                  </div>
                  <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-brand-charcoal/80 text-sm font-medium hover:text-brand-brown transition-colors">
                    <Package size={18} /> My Orders
                  </Link>
                  {profile?.is_admin && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-brand-brown font-semibold text-sm hover:text-brand-dark-brown transition-colors">
                      <LayoutDashboard size={18} /> Admin Dashboard
                    </Link>
                  )}
                  <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="flex items-center gap-3 text-red-500 text-sm font-medium hover:text-red-600 transition-colors text-left mt-2">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-brown text-brand-cream text-sm font-semibold hover:bg-brand-dark-brown transition-colors shadow-sm">
                  <LogIn size={18} /> Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
