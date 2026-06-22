"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Truck, Factory, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col lg:flex-row bg-[#ebdcd0] overflow-hidden">
      {/* Skewed Background Layer for Desktop Left side only */}
      <div
        className="absolute inset-y-0 left-0 w-full lg:w-[53%] bg-brand-cream z-10 hidden lg:block hero-skew-clip"
      />

      {/* === MOBILE: Image shown at top === */}
      <div className="relative w-full h-[56vw] min-h-[220px] max-h-[360px] block lg:hidden z-0">
        <Image
          src="/images/HeroNew.png"
          alt="Luxury Jewelry Packaging Showcase"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient fade to cream at bottom so content blends */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-brand-cream" />
      </div>

      {/* === DESKTOP: Image positioned absolutely on the right === */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-[55%] lg:h-full z-0">
        <Image
          src="/images/HeroNew.png"
          alt="Luxury Jewelry Packaging Showcase"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col lg:flex-row items-stretch lg:min-h-[calc(100vh-64px)]">

        {/* Left Side Content */}
        <div
          className="w-full lg:w-[48%] px-6 pt-4 pb-14 sm:px-12 lg:pl-16 lg:pr-8 lg:pt-24 lg:pb-16 flex flex-col justify-center bg-brand-cream lg:bg-transparent"
        >
          {/* Badge */}
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-brand-brown uppercase mb-5 block">
            PREMIUM PACKAGING MANUFACTURER
          </span>

          {/* Heading */}
          <h1 className="font-serif text-[1.9rem] sm:text-5xl lg:text-[3.25rem] xl:text-[4rem] font-bold text-brand-dark-brown leading-[1.15] mb-5">
            Packaging That <br className="hidden sm:inline" />
            Makes Your Jewelry Feel <br className="hidden sm:inline" />
            More Valuable
          </h1>

          {/* Description */}
          <p className="text-brand-dark-brown/80 font-normal text-sm sm:text-base leading-relaxed mb-8 max-w-md">
            Custom rigid boxes, magnetic boxes, drawer boxes, pouches and paper bags for jewelry brands across India.
          </p>

          {/* Icons Row */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8 max-w-md">
            {/* MOQ */}
            <div className="flex flex-col items-center text-center gap-2">
              <Package size={22} className="text-brand-dark-brown" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-brand-dark-brown uppercase tracking-wider leading-tight">MOQ</span>
                <span className="text-[10px] sm:text-xs text-brand-dark-brown/70 leading-normal">200 pcs</span>
              </div>
            </div>
            {/* Pan India Delivery */}
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={22} className="text-brand-dark-brown" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-brand-dark-brown uppercase tracking-wider leading-tight">PAN India</span>
                <span className="text-[10px] sm:text-xs text-brand-dark-brown/70 leading-normal">Delivery</span>
              </div>
            </div>
            {/* In-House Manufacturing */}
            <div className="flex flex-col items-center text-center gap-2">
              <Factory size={22} className="text-brand-dark-brown" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-brand-dark-brown uppercase tracking-wider leading-tight">In-House</span>
                <span className="text-[10px] sm:text-xs text-brand-dark-brown/70 leading-normal">Manufacturing</span>
              </div>
            </div>
            {/* Custom Logo Printing */}
            <div className="flex flex-col items-center text-center gap-2">
              <Sparkles size={22} className="text-brand-dark-brown" strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-xs font-bold text-brand-dark-brown uppercase tracking-wider leading-tight">Custom Logo</span>
                <span className="text-[10px] sm:text-xs text-brand-dark-brown/70 leading-normal">Printing</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 w-full">
            <Link
              href="/contact?subject=Quote"
              className="bg-brand-dark-brown text-[#FAF6F0] px-5 py-3 sm:px-6 sm:py-3.5 font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-[#3d2a1f] transition-all rounded-sm flex items-center justify-center gap-2 group shadow-md cursor-pointer"
            >
              GET FREE QUOTE <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/contact?subject=Sample%20Kit"
              className="bg-transparent border border-brand-dark-brown text-brand-dark-brown px-5 py-3 sm:px-6 sm:py-3.5 font-semibold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-brand-dark-brown hover:text-[#FAF6F0] transition-all rounded-sm flex items-center justify-center gap-2 group cursor-pointer"
            >
              ORDER SAMPLE KIT <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Right side spacer on desktop */}
        <div className="hidden lg:block lg:flex-1 pointer-events-none" />

      </div>
    </section>
  );
}
