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
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
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

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <CategoryCard key={category._id} category={category} />
                ))}
            </div>
        </section>
    );
}
