"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="w-full py-16 lg:py-24 bg-brand-cream relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 relative group">
            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-brand-brown/10 blur-3xl rounded-full scale-110 -z-10 transition-transform duration-1000 group-hover:scale-150"></div>
            
            {/* Adjusted aspect ratio for mobile to prevent it from being too tall */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-brand-brown/10">
              <Image 
                src="/images/hero_premium.png" 
                alt="About PreciousPackaging" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating badge for Desktop */}
            <div className="hidden sm:block absolute -bottom-8 -right-8 bg-brand-dark-brown text-brand-cream p-8 rounded-2xl shadow-xl z-10 border border-white/10">
              <p className="text-4xl font-serif mb-2">10M+</p>
              <p className="text-xs uppercase tracking-widest text-brand-beige">Boxes Shipped</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-brand-dark-brown tracking-tight mb-6 lg:mb-8 leading-[1.1] break-words">
              Redefining <br className="hidden sm:block" />
              <span className="italic text-brand-brown">Premium.</span>
            </h2>
            
            <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-brand-charcoal/80 font-light leading-relaxed mb-8 lg:mb-10">
              <p>
                At <strong className="font-medium text-brand-dark-brown">PreciousPackaging</strong>, we believe that unboxing should be an unforgettable experience. Founded with a vision to merge luxury aesthetics with eco-conscious materials, we create packaging that speaks volumes before the product is even revealed.
              </p>
              <p>
                Our materials are 100% sourced from sustainable forests, utilizing soy-based inks and biodegradable laminations to ensure your brand leaves a mark on your customers, not the planet.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
              {/* Visible on mobile only, since desktop has the floating badge */}
              <div className="sm:hidden">
                <h4 className="text-2xl sm:text-4xl font-serif text-brand-dark-brown mb-1 lg:mb-2">10M+</h4>
                <p className="font-medium text-brand-brown uppercase tracking-widest text-[10px] sm:text-xs">Boxes Shipped</p>
              </div>
              <div className="hidden sm:block">
                {/* Desktop placeholder so the second item aligns properly or we can add a different stat */}
                <h4 className="text-3xl sm:text-4xl font-serif text-brand-dark-brown mb-2">500+</h4>
                <p className="font-medium text-brand-brown uppercase tracking-widest text-xs">Global Brands</p>
              </div>
              <div>
                <h4 className="text-2xl sm:text-4xl font-serif text-brand-dark-brown mb-1 lg:mb-2">100%</h4>
                <p className="font-medium text-brand-brown uppercase tracking-widest text-[10px] sm:text-xs">FSC Certified</p>
              </div>
            </div>
            
            <div className="mt-2 sm:mt-8">
               <button className="w-full sm:w-auto px-8 py-4 border border-brand-brown font-medium uppercase tracking-widest bg-brand-brown text-brand-cream rounded-xl shadow-md hover:bg-brand-dark-brown hover:border-brand-dark-brown transition-colors text-xs lg:text-sm">
                  Our Sustainability Mission
               </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
