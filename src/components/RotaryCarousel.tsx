"use client";

import { motion } from "framer-motion";
import Image from "next/image";

  const products = [
    { id: 1, src: "/images/category_mailer.png", alt: "Mailer Box", zIndex: 10, rotate: -24, x: -180, y: 70 },
    { id: 2, src: "/images/category_pouch.png", alt: "Standup Pouch", zIndex: 20, rotate: -8, x: -60, y: 30 },
    { id: 3, src: "/images/category_rigid.png", alt: "Rigid Box", zIndex: 30, rotate: 8, x: 60, y: 30 },
    { id: 4, src: "/images/product1.png", alt: "Premium Box", zIndex: 25, rotate: 24, x: 180, y: 70 },
  ];
  
  export default function RotaryCarousel() {
    return (
      <div className="relative w-full h-[350px] flex items-center justify-center -mb-8 perspective-1000">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 300, x: 0, rotate: 0 }}
            animate={{ opacity: 1, y: product.y, x: product.x, rotate: product.rotate }}
            transition={{ 
              duration: 1.2, 
              delay: index * 0.15,
              type: "spring",
              bounce: 0.3
            }}
            whileHover={{ 
              y: product.y - 40,
              scale: 1.05,
              zIndex: 50,
              rotate: product.rotate > 0 ? product.rotate + 2 : product.rotate - 2,
              transition: { duration: 0.3, type: "spring" }
            }}
            className="absolute origin-bottom cursor-pointer drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
            style={{ zIndex: product.zIndex }}
          >
            <div className="relative w-[180px] h-[220px] sm:w-[220px] sm:h-[260px] lg:w-[260px] lg:h-[300px] rounded-2xl overflow-hidden border-4 border-white shadow-xl group transition-transform duration-500">
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 180px, (max-width: 1024px) 220px, 260px"
                  priority
                />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }
