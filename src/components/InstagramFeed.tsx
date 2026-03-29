"use client";

import Image from "next/image";

const feedImages = [
  "/images/hero_premium.png",
  "/images/category_rigid.png",
  "/images/category_mailer.png",
  "/images/category_pouch.png",
  "/images/product1.png"
];

export default function InstagramFeed() {
  return (
    <section className="w-full bg-brand-beige py-20 overflow-hidden" id="social">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-widest uppercase mb-2">@PreciousPackaging</h2>
        <p className="text-gray-500">Tag us to be featured in our sustainable community.</p>
      </div>

      <div className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-8 md:px-12 lg:px-0 lg:max-w-7xl lg:mx-auto pb-8 hide-scrollbar">
        {feedImages.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 w-64 h-64 md:w-72 md:h-72 lg:w-1/5 snap-center group overflow-hidden bg-gray-100">
            <Image 
              src={src} 
              alt={`Instagram Feed ${i+1}`} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
