"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Eco Mailer", price: "₹2.99", src: "/images/category_mailer.png" },
  { id: 2, name: "Kraft Pouch", price: "₹1.49", src: "/images/category_pouch.png" },
  { id: 3, name: "Luxury Rigid", price: "₹5.99", src: "/images/category_rigid.png" },
  { id: 4, name: "Custom Box", price: "₹4.99", src: "/images/product1.png" },
  { id: 5, name: "Bio Mailer", price: "₹3.49", src: "/images/category_mailer.png" },
  { id: 6, name: "Clear Pouch", price: "₹1.99", src: "/images/category_pouch.png" },
];

export default function ProductGrid() {
  return (
    <section className="py-24 bg-brand-cream" id="all-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-medium text-[#2d3a24] mb-4">OUR COLLECTION</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our full range of sustainable, premium packaging solutions designed to elevate your brand.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative w-full aspect-square bg-[#f8f9fa] rounded-2xl overflow-hidden mb-4 p-8 transition-colors group-hover:bg-[#f1f3f5]">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-110 drop-shadow-lg"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-normal text-gray-900">{product.name}</h3>
                  <p className="text-gray-500">{product.price}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-black text-white flex justify-center items-center hover:bg-gray-800 transition-colors">
                  +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <button className="px-8 py-3 bg-brand-cream border-2 border-black text-black font-normal uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                View All Products
            </button>
        </div>
      </div>
    </section>
  );
}
