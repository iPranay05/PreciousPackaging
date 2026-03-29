"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  { id: 1, name: "MAILERS", size: "col-span-12 md:col-span-8", src: "/images/category_mailer.png", bg: "bg-brand-beige" },
  { id: 2, name: "POUCHES", size: "col-span-6 md:col-span-4", src: "/images/category_pouch.png", bg: "bg-brand-beige" },
  { id: 3, name: "RIGID BOXES", size: "col-span-6 md:col-span-5", src: "/images/category_rigid.png", bg: "bg-[#FEE8F4]" },
  { id: 4, name: "CUSTOM", size: "col-span-12 md:col-span-7", src: "/images/product1.png", bg: "bg-[#E8FEED]" },
];

export default function Categories() {
  return (
    <section className="py-20 bg-brand-beige" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-black mb-16 tracking-tighter">SHOP BY CATEGORY</h2>

        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 h-[800px] md:h-[600px]">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${category.size} ${category.bg} relative rounded-3xl overflow-hidden group cursor-pointer border border-black/5 p-6 md:p-8 flex flex-col justify-end min-h-[300px]`}
            >
              <div className="absolute inset-0 z-0">
                <div className="relative w-full h-full transition-transform duration-1000 group-hover:scale-105">
                  <Image
                    src={category.src}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  {/* Subtle darkening overlay for text contrast */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
              </div>

              <div className="relative z-10 w-full flex justify-between items-end mt-auto">
                <div className="bg-brand-cream/95 backdrop-blur px-6 py-4 md:px-8 md:py-5 rounded-2xl shadow-lg border border-white/20 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="font-semibold tracking-widest uppercase text-lg md:text-xl text-brand-dark-brown">{category.name}</h3>
                  <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">Explore Collection</p>
                </div>
                
                <div className="hidden sm:flex w-12 h-12 md:w-14 md:h-14 rounded-full bg-brand-cream/95 backdrop-blur items-center justify-center shadow-lg text-brand-dark-brown transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-brand-dark-brown group-hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
