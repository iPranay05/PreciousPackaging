"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabasePublic } from "@/lib/supabase";

export interface CollectionItem {
  id: number;
  name: string;
  src: string;
  href: string;
  sort_order: number;
}

export const DEFAULT_CATEGORIES: CollectionItem[] = [
  { id: 1, name: "Ring Boxes",     src: "/images/collection_ring.png",     href: "/products?category=ring-boxes",     sort_order: 1 },
  { id: 2, name: "Earring Boxes",  src: "/images/collection_earring.png",  href: "/products?category=earring-boxes",  sort_order: 2 },
  { id: 3, name: "Necklace Boxes", src: "/images/collection_necklace.png", href: "/products?category=necklace-boxes", sort_order: 3 },
  { id: 4, name: "Drawer Boxes",   src: "/images/collection_drawer.png",   href: "/products?category=drawer-boxes",   sort_order: 4 },
  { id: 5, name: "Magnetic Boxes", src: "/images/collection_magnetic.png", href: "/products?category=magnetic-boxes", sort_order: 5 },
  { id: 6, name: "Paper Bags",     src: "/images/collection_bag.png",      href: "/products?category=paper-bags",     sort_order: 6 },
];

export default function Categories() {
  const [categories, setCategories] = useState<CollectionItem[]>(DEFAULT_CATEGORIES);

  useEffect(() => {
    supabasePublic
      .from("collection_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setCategories(data as CollectionItem[]);
      });
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6F0]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wider text-brand-dark-brown uppercase mb-3">
            Our Packaging Collection
          </h2>
          <p className="font-serif text-sm sm:text-base md:text-lg text-brand-dark-brown/70 max-w-xl mx-auto">
            Premium packaging solutions for every jewelry collection.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group bg-[#FAF6F0] rounded-2xl p-2.5 sm:p-3 border border-brand-brown/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#FAF6F0] mb-4">
                <Image
                  src={category.src}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized={category.src.startsWith("http")}
                />
              </div>

              {/* Text Container */}
              <div className="text-center pb-2 flex flex-col items-center">
                <h3 className="font-serif text-sm sm:text-base font-bold text-brand-dark-brown mb-2 tracking-wide">
                  {category.name}
                </h3>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold text-brand-dark-brown/60 group-hover:text-brand-dark-brown tracking-[0.2em] uppercase transition-colors flex items-center gap-1">
                  Explore <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
