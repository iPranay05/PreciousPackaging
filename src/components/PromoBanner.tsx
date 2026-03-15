"use client";

import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="w-full relative py-20 bg-[#0A2540] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2MCcgaGVpZ2h0PSc2MCc+CgkJPHJlY3Qgd2lkdGg9JzYwJyBoZWlnaHQ9JzYwJyBmaWxsPScjMEEyNTQwJy8+CgkJPGNpcmNsZSBjeD0nMTAnIGN5PScxMCcgcj0nMicgZmlsbD0nI2ZmZmZmZicgZmlsbC1vcGFjaXR5PScwLjE1Jy8+Cjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between w-full">
        <div className="text-left text-white md:w-2/3">
          <span className="bg-white text-[#0A2540] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-widest mb-6 inline-block shadow-sm">Limited Time Offer</span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-4 uppercase">
            Spring Sale
          </h2>
          <p className="text-xl sm:text-2xl font-bold tracking-wide opacity-90 max-w-lg leading-snug">
            Get 20% off all Custom Standup Pouches using code <span className="bg-black text-white px-2 py-1 rounded">SPRING20</span>
          </p>
        </div>
        
        <div className="md:w-1/3 flex justify-end">
            <button className="px-10 py-5 bg-white text-[#0A2540] font-black uppercase tracking-widest hover:bg-gray-100 transition-colors text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-2 border-black active:shadow-none active:translate-x-2 active:translate-y-2">
                Shop The Sale
            </button>
        </div>
      </div>
    </section>
  );
}
