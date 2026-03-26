"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const { supabase } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, mobile },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0A2540] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-3 group mb-2">
            <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-14 sm:h-16 w-auto object-contain invert mix-blend-screen contrast-125" />
            <span className="font-serif font-medium tracking-wide text-2xl sm:text-3xl text-white group-hover:opacity-80 transition-opacity">
              Precious<span className="text-white/80">Packaging</span>
            </span>
          </Link>
          <p className="text-white/50 text-sm">Create your account</p>
        </div>

        <form
          onSubmit={handleSignup}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-5"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-white/50 placeholder-white/30 transition-colors"
              placeholder="Min. 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0A2540] font-bold uppercase tracking-widest py-3 rounded-lg text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-white/50 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-white font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
