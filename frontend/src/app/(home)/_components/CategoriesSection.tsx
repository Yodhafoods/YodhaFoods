"use client";

import React from "react";
import CategoriesList from "./CategoriesList";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesSection() {
    const { categories } = useCategories();

    if (!categories || categories.length === 0) {
        return null; // Or return a skeleton/empty state if preferred, but existing logic returned null on error
    }

    return (
        <section className="mb-2 mt-12 relative group/section">
            <div className="flex justify-between items-baseline mb-6 px-1">
                <h2 className="flex group items-center gap-1 text-lg md:text-xl font-bold text-gray-900 tracking-tight cursor-pointer">
                    Top Categories
                    <ChevronRight
                        size={24}
                        strokeWidth={3}
                        className="text-gray-700 group-hover:text-orange-600 hover:text-orange-600 group-hover:translate-x-2 transition-all text-xl font-bold"
                    />
                </h2>
                <Link
                    href="/shop"
                    className="text-sm group font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                >
                    View All{" "}
                    <ArrowRight
                        size={16}
                        className=" group-hover:translate-x-2 transition-all"
                    />
                </Link>
            </div>

            <CategoriesList categories={categories} />
        </section>
    );
}

