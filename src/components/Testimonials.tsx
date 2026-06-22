"use client";

import { motion } from "framer-motion";

const testimonials = [
  { 
    quote: "The quality and finish of Precious Pack boxes are outstanding. It has truly elevated our brand experience.", 
    author: "Palmonas"
  },
  { 
    quote: "Their team understands luxury and delivers packaging that adds real value to our jewelry.", 
    author: "Kisna"
  },
  { 
    quote: "Reliable, consistent and premium quality. Our go-to packaging partner for all collections.", 
    author: "Bluestone"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-[#FAF6F0] overflow-hidden relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-brand-dark-brown uppercase mb-3">
            LOVED BY BRANDS
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-brand-dark-brown/70 max-w-xl mx-auto">
            Real experiences from our happy clients.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex gap-1 mb-5 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-brand-charcoal/90 text-base md:text-[17px] leading-relaxed mb-6 font-sans">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-sans text-brand-dark-brown/90 font-medium text-sm md:text-base">- {item.author}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
