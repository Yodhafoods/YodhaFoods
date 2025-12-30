"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCardHome from "@/features/products/components/ProductCardHome";
import { Product } from "@/types";
import { api } from "@/lib/api";

interface RelatedProductsProps {
    categoryId: string;
    currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                // Fetch more than 4 to ensure we have enough after filtering
                const data: any = await api.get(`/api/products?category=${categoryId}&limit=6`);

                if (data.products) {
                    const filtered = data.products
                        .filter((p: Product) => p._id !== currentProductId) // Filter out current product
                        .slice(0, 4); // Take top 4
                    setProducts(filtered);
                }
            } catch (error) {
                console.error("Failed to fetch related products", error);
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchRelated();
        }
    }, [categoryId, currentProductId]);

    if (loading || products.length === 0) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop Related Products</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCardHome
                            key={product._id}
                            product={{
                                id: product._id,
                                name: product.name,
                                price: product.price,
                                img: product.images[0]?.url || "/placeholder.png",
                                slug: product.slug,
                                badge: product.isFeatured ? 'Featured' : undefined
                            }}
                            className="min-w-0"
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide text-sm"
                    >
                        Explore More Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
