"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CircularGallery from "./CircularGallery";

const galleryItems = [
  { image: "/images/category_mailer.png", text: "Eco Mailer" },
  { image: "/images/category_pouch.png",  text: "Kraft Pouch" },
  { image: "/images/category_rigid.png",  text: "Luxury Rigid" },
  { image: "/images/product1.png",        text: "Custom Box" },
  { image: "/images/category_mailer.png", text: "Eco Mailer" },
  { image: "/images/category_rigid.png",  text: "Luxury Rigid" },
];

export default function FeaturedProducts() {
  // Only mount the WebGL gallery when we know the viewport is wide enough.
  // Using display:none breaks ogl because clientWidth/Height returns 0.
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="py-20 bg-brand-cream" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold text-black mb-3 tracking-tighter">BEST SELLERS</h2>
            <p className="text-gray-500 font-medium max-w-xl">
              Our most sought-after sustainable packaging solutions, loved by premium brands worldwide.
            </p>
          </div>
          <Link href="/products">
            <button className="hidden sm:block px-6 py-2 border-2 border-black font-normal uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors text-sm">
              Shop All
            </button>
          </Link>
        </div>
      </div>

      {/* ── Desktop: CircularGallery (WebGL) — only mounted when viewport ≥ 640px ── */}
      {isDesktop ? (
        <div style={{ height: "600px", width: "100%" }}>
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#232323ff"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
          />
        </div>
      ) : (
        /* ── Mobile: plain horizontal scroll ── */
        <>
          <div className="flex overflow-x-auto gap-5 px-4 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-center w-[80vw] max-w-[320px] rounded-3xl overflow-hidden relative aspect-[4/5] bg-brand-beige border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] group"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <Image src={item.image} alt={item.text} fill className="object-cover" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/40 to-transparent p-6 sm:p-8 flex flex-col justify-end h-[60%]">
                  <h3 className="text-brand-cream font-serif text-2xl sm:text-3xl tracking-wide mb-1.5">{item.text}</h3>
                  <p className="text-brand-cream/80 font-medium uppercase tracking-widest text-[10px] flex items-center gap-2">
                    Explore <span className="text-brand-cream opacity-70">→</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-2 px-4 mb-8">
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 border border-brand-brown font-medium uppercase tracking-widest bg-brand-brown text-brand-cream rounded-xl shadow-md hover:bg-brand-dark-brown hover:border-brand-dark-brown transition-colors text-xs sm:text-sm">
                Shop Collection
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
