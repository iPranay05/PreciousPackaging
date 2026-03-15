"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 1, name: "Premium Box", desc: "Corrugated", src: "/images/product1.png" },
  { id: 2, name: "Mailer Box", desc: "Sustainable", src: "/images/category_mailer.png" },
  { id: 3, name: "Standup Pouch", desc: "Flexible", src: "/images/category_pouch.png" },
  { id: 4, name: "Rigid Box", desc: "Luxury", src: "/images/category_rigid.png" },
];

export default function FourProductSection() {
  return (
    <section className="relative w-full py-24 bg-[#21C5EC] overflow-hidden text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row shadow-2xl relative w-full items-center mb-16 rounded-3xl overflow-hidden bg-[#1AA9CC]">
            <div className="w-full md:w-1/3 p-8 md:p-12 text-left relative z-10 bg-[#1696b6] h-full flex flex-col justify-center text-white">
                <h2 className="text-2xl font-bold mb-2">New Format!</h2>
                <h3 className="text-5xl font-black mb-4">More<br/>Practical</h3>
                <p className="text-lg italic opacity-90">even more sustainable</p>
            </div>

            <div className="w-full md:w-2/3 py-16 px-4 md:px-12 flex items-end justify-center gap-4 sm:gap-6 lg:gap-10 perspective-1000">
                {products.map((product, index) => (
                    <motion.div
                    key={product.id}
                    initial={{ opacity: 0, rotateY: 30, y: 50 }}
                    whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                    className="flex flex-col items-center group"
                    >
                    <div className="relative w-[100px] sm:w-[130px] lg:w-[160px] aspect-[1/2] transition-transform duration-500 group-hover:-translate-y-4">
                        <Image
                        src={product.src}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-2xl"
                        />
                    </div>
                    
                    <div className="mt-6 text-white text-center">
                        <h4 className="font-bold text-sm sm:text-base leading-tight drop-shadow-md">{product.name}</h4>
                        <p className="text-xs sm:text-sm mt-1 opacity-90 drop-shadow-sm mb-4">{product.desc}</p>
                        <button className="px-6 py-1.5 bg-[#fede00] hover:bg-white text-black font-bold text-xs uppercase rounded transition-colors shadow border border-black/10">
                            BUY
                        </button>
                    </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
