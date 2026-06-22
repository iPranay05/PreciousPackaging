"use client";

import { ChevronRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "CONSULT",
      desc: "Share your requirements and get expert guidance",
    },
    {
      number: "02",
      title: "DESIGN & QUOTE",
      desc: "We create design and share quotation",
    },
    {
      number: "03",
      title: "PRODUCTION",
      desc: "Precision manufacturing with strict quality check",
    },
    {
      number: "04",
      title: "DELIVERY",
      desc: "Secure packaging and on-time delivery",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0]" id="our-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-brand-dark-brown uppercase">
            OUR PROCESS
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-brand-dark-brown/70 mt-2">
            From concept to delivery in 4 simple steps.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative group">
              
              {/* Connector Line (Desktop only) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] items-center z-0">
                  <div className="h-[1px] flex-1 border-t border-dashed border-brand-brown/20"></div>
                  <ChevronRight className="w-3 h-3 text-brand-brown/40 -ml-1.5" />
                </div>
              )}

              {/* Step Circle Badge */}
              <div className="w-14 h-14 rounded-full bg-white border border-brand-brown/10 shadow-sm flex items-center justify-center font-serif text-base font-bold text-brand-dark-brown mb-6 relative z-10 hover:border-brand-brown/30 hover:scale-105 transition-all duration-300">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="font-sans text-xs sm:text-sm font-bold text-brand-dark-brown tracking-wider uppercase mb-2">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="font-sans text-[11px] sm:text-xs text-brand-dark-brown/70 leading-relaxed max-w-[200px] mx-auto">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
