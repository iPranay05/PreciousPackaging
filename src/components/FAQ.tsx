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
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter text-center mb-16">FREQUENTLY ASKED</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button 
                className="w-full flex justify-between items-center py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-[#0A2540]' : 'text-gray-400'}`}>+</span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 pb-6 pr-12 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
