"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function SampleKitBanner() {
  const features = [
    "4-5 Box Styles",
    "Color Chart",
    "Material Samples",
    "Price Catalogue",
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#2C1E16] text-[#F5F0E8] rounded-[2rem] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
          
          {/* Left Side: Elegant Image of Sample Kit Box */}
          <div className="w-full md:w-5/12 lg:w-4/12 relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-[#241710] flex items-center justify-center border border-white/5 group shadow-inner">
            <Image
              src="/images/sample_kit.png"
              alt="Precious Packaging Sample Kit Box"
              fill
              className="object-contain p-4 sm:p-6 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle glow effect behind box */}
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Right Side: Copy & Features & Button */}
          <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-center">
            
            {/* Tagline */}
            <span className="text-[#C9A84C] text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-3 inline-block">
              TRY BEFORE YOU ORDER
            </span>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white mb-6">
              Packaging Sample Kit <span className="text-[#C9A84C]">·</span> ₹499
            </h2>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl">
              Experience the unmatched luxury and craftsmanship of Precious Pack firsthand. Order our curated sample box to check paper textures, size options, and print quality before placing a bulk order. Fully refundable on your first production run.
            </p>

            {/* Bullets & Button Side-by-Side Flex Container */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pt-6 border-t border-white/10">
              
              {/* Features List */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 w-full lg:w-auto">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#C9A84C]" strokeWidth={3} />
                    </div>
                    <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <div className="w-full lg:w-auto flex-shrink-0">
                <Link
                  href="/products/sample-kit"
                  className="w-full lg:w-auto px-8 py-4 bg-[#F5F0E8] text-[#2C1E16] hover:bg-white active:scale-98 font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-black/20 flex items-center justify-center gap-2"
                >
                  ORDER SAMPLE KIT
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
