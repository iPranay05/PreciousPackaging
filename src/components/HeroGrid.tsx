"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 1, src: "/images/category_mailer.png", alt: "Mailer Box", gridClass: "col-span-2 max-md:row-span-2 md:col-span-2 md:row-span-2", yOffset: 20 },
  { id: 2, src: "/images/category_pouch.png", alt: "Standup Pouch", gridClass: "col-span-1 md:col-span-1 md:row-span-1", yOffset: -10 },
  { id: 3, src: "/images/category_rigid.png", alt: "Rigid Box", gridClass: "col-span-1 md:col-span-1 md:row-span-1", yOffset: 40 },
  { id: 4, src: "/images/product1.png", alt: "Premium Box", gridClass: "col-span-2 md:col-span-2 md:row-span-1", yOffset: 10 },
];

export default function HeroGrid() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 lg:mt-0 relative z-20 perspective-1000">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[120px] md:auto-rows-[160px] lg:auto-rows-[200px]">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: 1, 
              delay: index * 0.15,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className={`relative rounded-3xl overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.3)] bg-white/20 backdrop-blur-md border border-white/40 group cursor-pointer ${product.gridClass}`}
            style={{ 
               transform: `translateY(${product.yOffset}px)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/5 opacity-50 z-10 pointer-events-none rounded-3xl"></div>
            
            <Image
              src={product.src}
              alt={product.alt}
              fill
              className="object-contain p-6 md:p-8 filter drop-shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 relative z-0"
              sizes="(max-width: 768px) 50vw, 25vw"
              priority
            />
            
            <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="bg-black/80 backdrop-blur text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                 {product.alt}
               </span>
               <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold">
                 +
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
