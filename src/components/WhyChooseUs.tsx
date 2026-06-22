"use client";

import { Factory, ShieldCheck, Gem, Timer, Package, Truck } from "lucide-react";

const features = [
  {
    title: "Manufacturing Unit in Mumbai",
    description: "State-of-the-art facility with skilled craftsmen",
    icon: <Factory className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
  {
    title: "100% Production In-House",
    description: "Quality control in every step",
    icon: <ShieldCheck className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
  {
    title: "Premium Materials",
    description: "Sourced from trusted global suppliers",
    icon: <Gem className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
  {
    title: "Fast Turnaround Time",
    description: "On-time delivery every time",
    icon: <Timer className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
  {
    title: "Low MOQ 200pcs",
    description: "Perfect for emerging and growing brands",
    icon: <Package className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
  {
    title: "PAN India Shipping",
    description: "Safe & reliable delivery across India",
    icon: <Truck className="w-6 h-6 text-brand-dark-brown" strokeWidth={1.5} />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0] border-y border-[#e5e0d8]/60" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-widest text-brand-dark-brown uppercase">
            WHY CHOOSE PRECIOUS PACK?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 sm:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#f0ece6] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full bg-brand-cream/60 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <div className="[&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[1.25]">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-sans text-xs sm:text-sm font-bold text-brand-dark-brown mb-3 tracking-wide leading-tight min-h-[40px] flex items-center justify-center">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[10px] sm:text-xs text-brand-dark-brown/70 leading-relaxed max-w-[160px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
