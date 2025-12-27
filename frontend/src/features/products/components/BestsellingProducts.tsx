import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import BestsellingProductsList from "./BestsellingProductsList";
import { Product } from "@/types";

async function getProducts() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) {
            return [];
        }
        const data = await res.json();
        return (data.products || data) as Product[];
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export default async function BestsellingProducts() {
    const products = await getProducts();

    if (!products || products.length === 0) {
        return null;
    }

    return (
        <section className="mb-10 mt-12 relative group/section">
            <div className="flex justify-between items-baseline mb-6 px-1">
                <h2 className="flex group items-center gap-1 text-lg md:text-xl font-bold text-gray-900 tracking-tight cursor-pointer">
                    Best Selling Products
                    <ChevronRight
                        size={24}
                        strokeWidth={3}
                        className="text-gray-700 group-hover:text-orange-600 hover:text-orange-600 group-hover:translate-x-2 transition-all text-xl font-bold"
                    />
                </h2>
                <Link
                    href="/shop"
                    className=" hidden text-sm group font-bold text-orange-600 hover:text-orange-700 md:flex items-center gap-1 transition-colors"
                >
                    View All{" "}
                    <ArrowRight
                        size={16}
                        className=" group-hover:translate-x-2 transition-all"
                    />
                </Link>
            </div>

            <BestsellingProductsList products={products} />
        </section>
    );
}

