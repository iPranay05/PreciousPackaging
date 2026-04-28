"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextType from "./TextType";

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] pt-20 pb-12 px-4 bg-brand-cream relative overflow-hidden">
      {/* Background Decor - Subtle shapes for a "plain" but premium look */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-beige/20 -skew-x-12 translate-x-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[calc(100vh-160px)]">
        
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-left z-10"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-brand-brown/5 border border-brand-brown/10 text-brand-brown text-[10px] tracking-[0.2em] uppercase mb-6 font-medium">
            Eco-Luxury Packaging
          </div>

          <h1 className="text-[2.5rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-semibold text-brand-dark-brown leading-[1.05] tracking-tighter uppercase mb-6">
            Sustainable <br />
            <span className="text-brand-brown font-serif italic">
              <TextType
                text={["Packaging.", "Branding.", "Excellence."]}
                typingSpeed={60}
                deletingSpeed={35}
                pauseDuration={2200}
                loop={true}
                showCursor={true}
                cursorCharacter=""
                cursorClassName="text-brand-brown/50"
                className="font-serif italic"
              />
            </span>
          </h1>

          <p className="text-brand-dark-brown/70 font-medium tracking-wide mb-10 max-w-lg text-sm sm:text-lg leading-relaxed">
            Elevate your brand with 100% eco-friendly, premium materials. 
            Tailored solutions for modern brands that value sustainability and style.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-brand-brown text-brand-cream px-10 py-4 font-semibold uppercase tracking-widest text-xs hover:bg-brand-dark-brown transition-all rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
              Get Quote
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="bg-transparent border border-brand-brown/20 text-brand-dark-brown px-10 py-4 font-semibold uppercase tracking-widest text-xs hover:bg-brand-brown hover:text-brand-cream transition-all rounded-full flex items-center justify-center">
              View Products
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center gap-8 border-t border-brand-brown/10 pt-8">
            <div>
              <div className="text-2xl font-semibold text-brand-dark-brown">100%</div>
              <div className="text-[10px] text-brand-brown/60 uppercase tracking-widest">FSC Certified</div>
            </div>
            <div className="w-px h-8 bg-brand-brown/10" />
            <div>
              <div className="text-2xl font-semibold text-brand-dark-brown">500+</div>
              <div className="text-[10px] text-brand-brown/60 uppercase tracking-widest">Happy Brands</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Visual Placeholder for Animated Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-2xl relative aspect-[4/5] lg:aspect-square group"
        >
          {/* Main Visual Container */}
          <div className="absolute inset-0 bg-brand-beige rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-brand-brown/5 border border-brand-brown/5">
            {/* Subtle Texture for "Plain" background */}
            <div className="absolute inset-0 opacity-10 mix-blend-multiply">
              <Image
                src="/images/heroImage.png"
                alt="Texture"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Placeholder Content - Until the animated image arrives */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
               {/* 
                  This is the spot where the animated image will be added.
                  For now, we use a clean, premium visual arrangement.
               */}
               <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 bg-brand-cream rounded-2xl rotate-3 shadow-lg absolute transform group-hover:rotate-6 transition-transform duration-700" />
                  <div className="w-3/4 h-3/4 bg-white/40 backdrop-blur-sm rounded-2xl -rotate-2 border border-white/20 shadow-xl relative z-10 flex flex-col items-center justify-center gap-4 text-center p-8">
                    <div className="w-16 h-16 rounded-full bg-brand-brown/10 flex items-center justify-center text-brand-brown mb-2">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                       </svg>
                    </div>
                    <h3 className="font-serif italic text-2xl text-brand-dark-brown">Bespoke Design</h3>
                    <p className="text-xs text-brand-brown/60 uppercase tracking-widest leading-relaxed">
                      Future Home of <br /> Animated Brand Story
                    </p>
                  </div>
               </div>
            </div>

            {/* Floaties - subtle decorative elements */}
            <div className="absolute top-12 right-12 w-24 h-24 bg-brand-brown/5 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-12 left-12 w-32 h-32 bg-brand-brown/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-brand-brown/40 to-transparent" />
        <span className="text-[10px] text-brand-brown/40 uppercase tracking-[0.3em] vertical-text">Scroll</span>
      </motion.div>
    </section>
  );
}
