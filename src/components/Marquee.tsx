"use client";

import React from "react";
import { LayoutGrid, Boxes, CheckCircle2, Truck, Users } from "lucide-react";

const stats = [
  {
    icon: LayoutGrid,
    title: "500+",
    desc: "Projects\nCompleted",
  },
  {
    icon: Users,
    title: "100+",
    desc: "Brands\nServed",
  },
  {
    icon: Boxes,
    title: "1M+",
    desc: "Boxes\nMade",
  },
  {
    icon: CheckCircle2,
    title: "90%",
    desc: "In-House\nProduction",
  },
  {
    icon: Truck,
    title: "PAN\nIndia",
    desc: "Delivery\nCoverage",
  },
];

export default function Marquee() {
  return (
    <section className="w-full bg-[#FAF6F0] border-b border-brand-brown/10 relative">
      {/* Title */}
      <div className="text-center pt-8 sm:pt-12 pb-6 sm:pb-10 px-4">
        <span className="text-[10px] sm:text-[12px] font-bold text-brand-dark-brown/60 tracking-[0.2em] uppercase">
          Trusted by 100+ Jewelry Brands Across India
        </span>
      </div>

      {/* ── MOBILE: horizontal scroll row ── */}
      <div className="md:hidden overflow-x-auto scrollbar-hide pb-8 px-4">
        <div className="flex gap-3 w-max mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2.5 bg-white border border-brand-brown/10 rounded-2xl px-5 py-4 shadow-sm min-w-[100px]"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f5ede6] flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#9A6A45]" strokeWidth={1.5} size={18} />
                </div>
                <span className="font-serif text-[1.25rem] font-semibold text-[#9A6A45] leading-none text-center whitespace-pre-line">
                  {stat.title}
                </span>
                <span className="text-[9px] font-sans text-brand-dark-brown/60 font-semibold leading-[1.4] text-center whitespace-pre-line tracking-wide uppercase">
                  {stat.desc}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP (md+): single row with dividers ── */}
      <div className="hidden md:flex max-w-[1400px] mx-auto px-8 lg:px-16 pb-12 items-center justify-between">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <React.Fragment key={index}>
              <div className="flex flex-row items-center gap-4 flex-1 justify-center px-4">
                <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-[#9A6A45] flex-shrink-0" strokeWidth={1.2} />
                <div className="flex flex-col">
                  <span className="font-serif text-[1.65rem] lg:text-[1.9rem] font-semibold text-[#9A6A45] leading-none mb-1 whitespace-pre-line">
                    {stat.title === "1M+" ? "1 Million+" : stat.title}
                  </span>
                  <span className="text-[10px] lg:text-[11px] font-sans text-brand-dark-brown/80 font-semibold leading-[1.3] whitespace-pre-line">
                    {stat.desc === "Boxes\nMade" ? "Boxes Manufactured" : stat.desc}
                  </span>
                </div>
              </div>
              {index < stats.length - 1 && (
                <div className="w-px h-12 bg-brand-brown/20 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
