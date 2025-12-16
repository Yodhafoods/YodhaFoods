"use client";

import React from "react";
import { useCategories } from "@/hooks/useCategories";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesSection() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <section className="mb-20 mt-10">
                <div className="h-8 w-48 bg-gray-200 rounded mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse"
                        ></div>
                    ))}
                </div>
            </section>
        );
    }

    if (error || categories.length === 0) return null;

    return (
        <section className="mb-20 mt-10">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl md:text-4xl font-bold">Shop by Category</h2>
            </div>

            <div
                className="
          lg:grid lg:grid-cols-4 lg:gap-8
          flex gap-5 overflow-x-auto lg:overflow-visible
          snap-x snap-mandatory pb-4 scrollbar-hide
          -mx-6 px-6 lg:mx-0 lg:px-0
        "
            >
                {categories.map((category) => (
                    <div
                        key={category._id}
                        className="min-w-[85%] sm:min-w-[45%] lg:min-w-0 snap-start"
                    >
                        <CategoryCard category={category} />
                    </div>
                ))}
            </div>
        </section>
    );
}
