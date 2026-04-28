"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Lock, Loader2 } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Sign up user
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });

      if (signupError) throw signupError;

      if (data.user) {
        // 2. Create profile entry
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          full_name: fullName,
          email: email,
        });

        if (profileError) throw profileError;
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex">
      {/* Left Side: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative overflow-y-auto">
        <Link 
          href="/" 
          className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2 text-brand-charcoal/60 hover:text-brand-brown transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md mx-auto lg:mx-0 py-8"
        >
          {/* Logo */}
          <div className="mb-12">
            <Link href="/" className="flex items-center gap-3 group">
              <img src="/images/LOGO.jpg" alt="PreciousPackaging" className="h-10 w-auto object-contain mix-blend-multiply" />
              <span className="font-serif font-medium tracking-tight text-xl text-brand-charcoal">
                Precious<span className="text-brand-charcoal/70">Packaging</span>
              </span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-serif font-medium text-brand-charcoal mb-3 tracking-tight">Create Account</h1>
            <p className="text-brand-charcoal/60 text-sm font-medium tracking-wide">Join our community of premium brands today.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-100 text-red-600 text-xs px-4 py-3 rounded-xl flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-red-600" />
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="block text-brand-charcoal/70 text-[10px] font-semibold uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30 group-focus-within:text-brand-brown transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-brand-brown/10 text-brand-charcoal rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5 transition-all placeholder-brand-charcoal/20"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-brand-charcoal/70 text-[10px] font-semibold uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30 group-focus-within:text-brand-brown transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-brand-brown/10 text-brand-charcoal rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5 transition-all placeholder-brand-charcoal/20"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-brand-charcoal/70 text-[10px] font-semibold uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-charcoal/30 group-focus-within:text-brand-brown transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-brand-brown/10 text-brand-charcoal rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-brand-brown focus:ring-4 focus:ring-brand-brown/5 transition-all placeholder-brand-charcoal/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-brown text-brand-cream font-semibold uppercase tracking-[0.2em] py-4 rounded-full text-xs hover:bg-brand-dark-brown transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Create Account"}
            </button>

            <div className="pt-4 text-center">
              <p className="text-brand-charcoal/50 text-xs font-medium tracking-wide">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-brand-brown font-bold hover:text-brand-dark-brown transition-colors underline-offset-4 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Right Side: Visual */}
      <div className="hidden lg:flex flex-1 bg-brand-dark-brown relative overflow-hidden items-center justify-center">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/earthy_silk_texture_bg.png"
            alt="Luxury Texture"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-brown/40 via-transparent to-brand-dark-brown/80" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-3/4 aspect-square max-w-lg"
        >
          <div className="absolute inset-0 bg-brand-cream/10 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <Image src="/images/heroImage.png" alt="Packaging Texture" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark-brown mb-6 shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif italic mb-4">Start Your Journey</h2>
              <p className="text-white/60 text-sm font-light tracking-widest leading-relaxed uppercase">
                Eco-Friendly Packaging <br /> Reimagined for Your Brand
              </p>
            </div>
          </div>
          
          {/* Floating Accents */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-brown/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-brown/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
