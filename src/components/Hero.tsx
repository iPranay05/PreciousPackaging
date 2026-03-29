"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TextType from "./TextType";

export default function Hero() {
  return (
    <section className="w-full min-h-[calc(100vh-64px)] pt-20 pb-4 px-4 bg-brand-cream">
      {/* 
        A unique bento grid that takes up mostly the full screen. 
        Instead of stacked text and images, text, images, and stats share the hero real estate.
      */}
      <div className="max-w-7xl mx-auto h-full min-h-[600px] lg:h-[calc(100vh-120px)] grid grid-cols-2 md:grid-cols-12 md:grid-rows-6 gap-3 sm:gap-4">

        {/* Main Text & Atmosphere Block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-2 md:col-span-8 md:row-span-6 rounded-2xl md:rounded-3xl bg-brand-beige p-6 lg:p-12 flex flex-col justify-end relative overflow-hidden group min-h-[350px] sm:min-h-[400px]"
        >
          {/* Subtle background texture/image inside the main block */}
          <div className="absolute inset-0 opacity-5 mix-blend-multiply transition-transform duration-1000 group-hover:scale-105 pointer-events-none">
            <Image
              src="/images/heroImage.png"
              alt="Texture"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 w-full mt-auto">
            <h1 className="text-[2.25rem] sm:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-semibold text-brand-dark-brown leading-[1] tracking-tighter uppercase mb-4 sm:mb-6 break-words">
              Sustainable <br className="hidden sm:block" />
              <span className="text-brand-brown drop-shadow-sm font-serif italic text-[2rem] sm:text-[4rem] lg:text-[5rem] xl:text-[6.5rem]">
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
            <p className="text-brand-dark-brown font-medium tracking-widest uppercase mb-8 max-w-md text-sm sm:text-base leading-relaxed opacity-90">
              Elevate your brand with 100% eco-friendly, premium materials delivered directly to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-brand-brown text-brand-cream px-8 py-4 font-normal uppercase tracking-widest text-sm hover:bg-brand-dark-brown transition-colors rounded-xl shadow-md flex items-center justify-center gap-2">
                🌱 Get Quote
              </button>
              <button className="bg-transparent border-2 border-brand-brown text-brand-dark-brown px-8 py-4 font-normal uppercase tracking-widest text-sm hover:bg-brand-brown/10 transition-colors rounded-xl shadow-sm flex items-center justify-center gap-2">
                📦 View Products
              </button>
            </div>
          </div>
        </motion.div>

        {/* Top Right Block - Product Spotlight 1 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="col-span-2 md:col-span-4 md:row-span-3 rounded-2xl md:rounded-3xl bg-brand-cream border border-brand-brown/10 relative overflow-hidden group flex items-center justify-center p-6 sm:p-8 min-h-[200px] sm:min-h-[250px]"
        >
          <video 
            src="/images/precious_pack_-20260307-0001.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 font-normal text-[10px] sm:text-xs tracking-widest uppercase bg-brand-cream/90 backdrop-blur text-black px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm">
            Premium Rigid
          </div>
        </motion.div>

        {/* Bottom Right Split 1 - Product Spotlight 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="col-span-1 md:col-span-2 md:row-span-3 rounded-2xl md:rounded-3xl bg-brand-beige border border-brand-brown/10 relative overflow-hidden group min-h-[160px] sm:min-h-[200px]"
        >
          <video 
            src="/images/precious_pack_-20260307-0002.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute top-4 left-4 sm:top-4 sm:left-4 font-normal text-[10px] sm:text-xs tracking-widest text-brand-dark-brown bg-brand-cream/80 backdrop-blur px-2 py-1 sm:px-0 sm:py-0 sm:bg-transparent sm:backdrop-blur-none rounded-sm">01 / POUCH</div>
        </motion.div>

        {/* Bottom Right Split 2 - Stats / Trust Signal */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="col-span-1 md:col-span-2 md:row-span-3 rounded-2xl md:rounded-3xl bg-brand-dark-brown p-4 sm:p-6 flex flex-col justify-between text-white relative overflow-hidden min-h-[160px] sm:min-h-[200px]"
        >
          <video 
            src="/images/precious_pack_-20260307-0003.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-70" 
          />
          <div className="absolute inset-0 bg-brand-dark-brown/40 z-0"></div>
          
          <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-brand-cream flex items-center justify-center text-brand-dark-brown shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
              <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative z-10 mt-4 sm:mt-8">
            <div className="text-2xl sm:text-4xl font-semibold mb-1 text-white leading-none">100%</div>
            <div className="text-[10px] sm:text-xs text-white/80 font-normal uppercase tracking-widest leading-relaxed">
              FSC Certified
            </div>
          </div>

          <div className="absolute -bottom-10 -right-10 opacity-10">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
