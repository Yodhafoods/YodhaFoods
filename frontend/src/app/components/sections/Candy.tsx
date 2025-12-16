"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "../ProductCard";

export default function Candy() {
  const { products, loading, error } = useProducts("fruit-powders");

  if (loading) {
    return (
      <section className="mt-20 px-6">
        <div className="flex justify-between items-start border-b-2 border-gray-300 pb-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-300 animate-pulse bg-gray-200 h-10 w-48 rounded"></h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    // If error or no products, we hide the section or show a message?
    // Hiding is safer for homepage.
    return null;
  }

  // Map and slice products
  const displayProducts = products.slice(0, 4).map((p: any) => ({
    id: p._id,
    name: p.name,
    price: p.price,
    img: p.images?.[0]?.url || '/placeholder.jpg',
    slug: p.slug,
    badge: p.isFeatured ? 'Featured' : undefined
  }));

  return (
    <section id="candy" className="mt-20">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-gray-300 pb-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">Nature's Candy</h2>
          <p className="text-gray-600 mt-1">100% Fruit Powders for guilt-free sweetness.</p>
        </div>

        {/* View All Button */}
        <Link
          href="/categories/fruit-powders"
          className="px-6 py-3 bg-black text-white font-bold rounded-full
                     transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                     hover:bg-orange-500 hover:-translate-y-1 whitespace-nowrap"
        >
          View All
        </Link>
      </div>

      {/* Grid */}
      <div
        className="
          lg:grid lg:grid-cols-4 lg:gap-8
          flex gap-5 overflow-x-auto lg:overflow-visible
          snap-x snap-mandatory pb-2 scrollbar-hide
        "
      >
        {displayProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
