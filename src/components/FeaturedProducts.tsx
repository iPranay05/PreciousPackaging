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
    <section className="py-20 bg-white" id="featured">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-black mb-3 tracking-tighter">BEST SELLERS</h2>
            <p className="text-gray-500 font-medium max-w-xl">
              Our most sought-after sustainable packaging solutions, loved by premium brands worldwide.
            </p>
          </div>
          <Link href="/products">
            <button className="hidden sm:block px-6 py-2 border-2 border-black font-bold uppercase tracking-widest bg-black text-white hover:bg-gray-800 transition-colors text-sm">
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
          <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-center w-64 rounded-2xl overflow-hidden relative aspect-[3/4] bg-gray-100"
              >
                <Image src={item.image} alt={item.text} fill className="object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-bold text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link href="/products">
              <button className="px-6 py-2 border-2 border-black font-bold uppercase tracking-widest bg-black text-white text-sm">
                Shop All
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
