"use client";

import Link from "next/link";
import { ShoppingBag, Menu, LogIn, LogOut, Package, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFCF8] border-b border-[#e5e0d8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="lg:hidden p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors">
            <Menu size={24} className="text-[#1a1a1a]" />
          </button>
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-10 sm:h-12 w-auto object-contain mix-blend-multiply" />
            <span className="font-serif font-medium tracking-wide text-xl sm:text-2xl text-[#1a1a1a] group-hover:opacity-80 transition-opacity">
              Precious<span className="text-[#1a1a1a]/70">Packaging</span>
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/80 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/#featured" className="hover:text-[#8b7355] transition-opacity">BEST SELLERS</Link>
          <Link href="/#categories" className="hover:text-[#8b7355] transition-opacity">CATEGORIES</Link>
          <Link href="/products" className="hover:text-[#8b7355] transition-opacity">PRODUCTS</Link>
          <Link href="/#faq" className="hover:text-[#8b7355] transition-opacity">FAQ</Link>
        </nav>

        {/* Right: Auth + Cart */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged-in user dropdown */
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-[#1a1a1a] text-sm font-semibold"
              >
                <span className="hidden sm:block max-w-[120px] truncate">
                  {profile?.full_name ?? user.email}
                </span>
                <ChevronDown size={14} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#FDFCF8] border border-[#e5e0d8] rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    href="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-[#1a1a1a]/80 hover:bg-black/5 text-sm transition-colors"
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-[#8b7355] hover:bg-black/5 text-sm transition-colors font-semibold"
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
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-black/10 text-[#1a1a1a] text-sm font-semibold hover:bg-black/5 transition-colors"
            >
              <LogIn size={14} /> Login
            </Link>
          )}

          <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
            <ShoppingBag size={20} className="text-[#1a1a1a]" />
            <span className="absolute top-1 right-1 bg-[#8b7355] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
