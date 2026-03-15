"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="w-full py-24 bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square rounded-full bg-[#0A2540] absolute -top-8 -left-8 w-64 h-64 -z-10 blur-3xl opacity-30"></div>
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero_premium.png" 
                alt="About PreciousPackaging" 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl font-black text-black tracking-tighter mb-6 relative inline-block">
              REDEFINING PREMIUM.
              <span className="absolute -bottom-2 left-0 w-1/3 h-2 bg-[#0A2540]"></span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At PreciousPackaging, we believe that unboxing should be an unforgettable experience. Founded with a vision to merge luxury aesthetics with eco-conscious materials, we create packaging that speaks volumes before the product is even revealed.
            </p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
              Our materials are 100% sourced from sustainable forests, utilizing soy-based inks and biodegradable laminations to ensure your brand leaves a mark on your customers, not the planet.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-black text-[#0A2540] mb-2">10M+</h4>
                <p className="font-bold text-gray-800 uppercase tracking-widest text-sm">Boxes Shipped</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-[#0A2540] mb-2">100%</h4>
                <p className="font-bold text-gray-800 uppercase tracking-widest text-sm">FSC Certified</p>
              </div>
            </div>
            
            <div className="mt-12">
               <button className="px-8 py-4 bg-black text-white font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
                  Our Sustainability Mission
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
