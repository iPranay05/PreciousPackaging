"use client";

import Link from "next/link";
import { ShoppingBag, Menu, LogIn, LogOut, Package, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user, profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A2540] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="lg:hidden p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <Menu size={24} className="text-white" />
          </button>
          <Link href="/" className="font-extrabold text-xl sm:text-2xl tracking-tighter text-white">
            PreciousPackaging
          </Link>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-bold text-xs tracking-widest uppercase text-white/90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/#project" className="hover:text-white transition-opacity">THE PROJECT</Link>
          <Link href="/#why-us" className="hover:text-white transition-opacity">WHY US</Link>
          <Link href="/products" className="hover:text-white transition-opacity">PRODUCTS</Link>
          <Link href="/#story" className="hover:text-white transition-opacity">OUR STORY</Link>
        </nav>

        {/* Right: Auth + Cart */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged-in user dropdown */
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-semibold"
              >
                <span className="hidden sm:block max-w-[120px] truncate">
                  {profile?.full_name ?? user.email}
                </span>
                <ChevronDown size={14} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0c2d4e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  <Link
                    href="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-white/80 hover:bg-white/10 text-sm transition-colors"
                  >
                    <Package size={15} /> My Orders
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 text-amber-400 hover:bg-white/10 text-sm transition-colors font-semibold"
                    >
                      <LayoutDashboard size={15} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-white/10 text-sm transition-colors w-full"
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
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <LogIn size={14} /> Login
            </Link>
          )}

          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <ShoppingBag size={20} className="text-white" />
            <span className="absolute top-1 right-1 bg-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center text-[#0A2540]">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
