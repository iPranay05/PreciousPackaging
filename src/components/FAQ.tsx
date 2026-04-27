"use client";

import { useState } from "react";

const faqs = [
  { question: "Are your materials entirely eco-friendly?", answer: "Yes, all our primary packaging is made from FSC-certified paper, compostable materials, and printed with soy-based inks. We ensure our supply chain is transparent and sustainable." },
  { question: "Can I order a sample before committing to a larger run?", answer: "Absolutely. We offer sample kits so you can feel the quality and test the dimensions with your products before placing a full production order." },
  { question: "What is your typical turnaround time?", answer: "For custom prints, our standard turnaround is 2-3 weeks from proof approval. Blank stock products ship within 48 hours." },
  { question: "Do you ship internationally?", answer: "Yes, we ship globally using carbon-neutral shipping partners to ensure our ecological footprint remains minimal." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-24 bg-brand-cream relative" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-dark-brown text-center mb-10 lg:mb-16 tracking-tight">
          Frequently Asked
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-brand-brown/10 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white shadow-sm border-brand-brown/20' : 'bg-transparent hover:bg-white/50'}`}
            >
              <button 
                className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-brand-charcoal pr-8 group-hover:text-brand-dark-brown transition-colors">
                  {faq.question}
                </span>
                <span className={`text-2xl font-light transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-brand-dark-brown' : 'text-brand-brown group-hover:text-brand-dark-brown'}`}>
                  +
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-brand-charcoal/80 px-5 md:px-6 pb-5 md:pb-6 leading-relaxed text-sm md:text-base font-light">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle decorative background element */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-beige rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none opacity-50"></div>
    </section>
  );
}
