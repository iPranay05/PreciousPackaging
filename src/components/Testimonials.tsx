"use client";

import { motion } from "framer-motion";

const testimonials = [
  { 
    quote: "PreciousPackaging entirely transformed our brand's unboxing experience. The quality of the rigid boxes is unmatched, and our customers constantly rave about the eco-friendly materials.", 
    author: "Sarah L.", 
    company: "Lumiere Skincare",
    rating: 5 
  },
  { 
    quote: "We switched to their custom pouches and saw a 20% increase in repeat customers. The vibrant colors and sustainable promise aligned perfectly with our mission.", 
    author: "James T.", 
    company: "Organic Brews",
    rating: 5 
  },
  { 
    quote: "The fastest turnaround time we've ever experienced for premium packaging. The structural integrity of the mailer boxes is top tier.", 
    author: "Elena M.", 
    company: "Luna Jewelry",
    rating: 5 
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-brand-beige overflow-hidden relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark-brown text-center mb-12 lg:mb-16 tracking-tight">
          Loved by Brands
        </h2>

        {/* Horizontal scroll container for mobile, Grid for desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 gap-4 md:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="w-[85vw] max-w-[320px] snap-center flex-shrink-0 md:w-auto md:max-w-none bg-brand-cream p-8 md:p-10 rounded-3xl shadow-sm border border-brand-brown/10 flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6 text-brand-brown">
                  {[...Array(item.rating)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-brand-charcoal/80 text-lg leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
              </div>
              <div>
                <p className="font-serif text-brand-dark-brown text-lg">{item.author}</p>
                <p className="text-brand-brown font-medium text-xs uppercase tracking-widest mt-1">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
