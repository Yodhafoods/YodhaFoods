"use client";

import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/app/components/ProductCard";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import ShopSidebar from "@/app/components/ShopSidebar";

export default function ShopPage() {
  const { categories, loading: categoriesLoading } = useCategories();
  // Start with "all" (empty slug/undefined)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { products, loading: productsLoading } = useProducts(selectedCategory);

  if (categoriesLoading && !selectedCategory) {
    // Initial load only
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  // Blinkit-style Layout:
  // Fixed sidebar on left (scrollable), Main content on right (scrollable)
  // Mobile: Sidebar is narrow (w-20 or w-1/4), Desktop: w-64
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Sidebar */}
      {/* Sidebar */}
      <ShopSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 md:p-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header for Mobile/Desktop context */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
              {selectedCategory
                ? categories.find(c => c.slug === selectedCategory)?.name
                : "All Products"}
            </h1>
            <span className="text-xs md:text-sm text-gray-500">
              {products.length} Items
            </span>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No products found.</p>
              <button
                onClick={() => setSelectedCategory(undefined)}
                className="mt-4 text-green-600 hover:underline font-medium"
              >
                Clear Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    id: product._id,
                    name: product.name,
                    price: product.price,
                    img: product.images?.[0]?.url || "/placeholder.png",
                    slug: product.slug,
                    badge: product.isFeatured ? "Featured" : undefined,
                  }}
                  className="min-w-0"
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
