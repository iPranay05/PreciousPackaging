"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-brand-dark-brown flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-3 group">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-14 sm:h-16 w-auto object-contain invert mix-blend-screen contrast-125" />
            <span className="font-serif font-medium tracking-wide text-2xl sm:text-3xl text-white group-hover:opacity-80 transition-opacity">
              Precious<span className="text-white/80">Packaging</span>
            </span>
          </Link>
          <p className="text-white/50 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-brand-cream/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-5"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/70 text-xs font-normal uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-cream/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-normal uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-cream/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-cream text-brand-dark-brown font-normal uppercase tracking-widest py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-center text-white/50 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-white font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
