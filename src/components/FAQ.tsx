"use client";

import { useState } from "react";

const faqs = [
  { 
    question: "What is the MOQ (Minimum Order Quantity)?", 
    answer: "Our minimum order quantity is 200 pieces per size. Shipping charges are additional. However, orders above 500 pieces qualify for free shipping." 
  },
  { 
    question: "What is the lead time?", 
    answer: "The standard production lead time is 15 working days after order confirmation and advance payment." 
  },
  { 
    question: "Is printing included in the price?", 
    answer: "Yes, printing is included in the price. Only the foil block charge is extra, which is a one-time cost." 
  },
  { 
    question: "What are the payment terms?", 
    answer: "We require 50% advance payment to begin production. The remaining 50% must be paid before dispatch." 
  },
  { 
    question: "Can I customize the box design and size?", 
    answer: "Yes, we offer fully customized boxes in terms of size, design, color, and finishing." 
  },
  { 
    question: "What materials are used for the boxes?", 
    answer: "Our boxes are made from high-quality rigid (kappa board) with thickness ranging from 1.5–2 mm, along with premium paper finishes." 
  },
  { 
    question: "Do you provide samples before bulk orders?", 
    answer: "Yes, sample options are available. Sample charges may apply, and delivery time may vary." 
  },
  { 
    question: "What printing options do you offer?", 
    answer: "We offer multiple printing options such as: Offset printing, Foil stamping, UV printing, and Embossing/Debossing." 
  },
  { 
    question: "How are the boxes shipped?", 
    answer: "Boxes are securely packed to ensure safe delivery without damage." 
  },
  { 
    question: "How can I place an order?", 
    answer: "You can place an order by sharing your requirements such as box size, quantity, and style/design. Our team will assist you through the process." 
  }
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
