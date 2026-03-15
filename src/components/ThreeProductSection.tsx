"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  { id: 1, name: "Mailer Box", desc: "Corrugated premium", src: "/images/category_mailer.png", bg: "#fecaca" },
  { id: 2, name: "Premium Standup", desc: "For organic products", src: "/images/category_pouch.png", bg: "#bbf7d0" },
  { id: 3, name: "Rigid Box", desc: "Luxury feel", src: "/images/category_rigid.png", bg: "#fef08a" },
];

export default function ThreeProductSection() {
  return (
    <section className="relative w-full py-24 bg-[#FEF4E8] overflow-hidden" id="products">
      {/* Decorative background elements can go here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#534031] tracking-tight mb-2">PREMIUM CARE</h2>
          <p className="text-xl text-[#786351] font-medium mb-16">The natural choice for packaging</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mt-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group flex flex-col items-center"
            >
              {/* Render an aesthetic shape behind the product if desired */}
              <div className="relative w-full aspect-[3/4] flex justify-center items-center mb-6">
                 {/* Blob behind */}
                 <div className="absolute inset-x-8 inset-y-12 rounded-full opacity-60 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-80" style={{ backgroundColor: product.bg }}></div>
                 <div className="relative w-4/5 h-full z-10 transition-transform duration-500 group-hover:-translate-y-4">
                   <Image
                     src={product.src}
                     alt={product.name}
                     fill
                     className="object-contain drop-shadow-xl"
                   />
                 </div>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-[#4a3a2d] uppercase">{product.name}</h3>
              <p className="text-[#8c7867] mt-2 mb-6 font-medium">{product.desc}</p>
              
              <button className="px-8 py-2 bg-[#f4a38e] hover:bg-[#eb8c73] text-white font-bold tracking-widest text-sm rounded transition-colors shadow-sm">
                BUY
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
