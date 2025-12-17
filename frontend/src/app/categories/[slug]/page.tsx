'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories'; // Fetching to get current category details
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';

export default function CategoryProductsPage() {
    const params = useParams();
    const slug = params.slug as string;

    const { products, loading: productsLoading, error: productsError } = useProducts(slug);
    // Optional: Fetch category details to display title/description of the specific category
    const { categories } = useCategories();
    const currentCategory = categories.find(c => c.slug === slug);
    console.log(currentCategory);

    // Map products to match ProductCard props
    const displayProducts = products.map((product) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        img: product.images?.[0]?.url || '/placeholder.jpg',
        slug: product.slug,
        badge: product.isFeatured ? 'Featured' : undefined
    }));

    if (productsLoading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="h-10 w-1/3 bg-gray-200 rounded mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl animate-pulse"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (productsError) {
        return (
            <div className="container mx-auto px-4 py-16 text-center text-gray-800">
                Error loading products: {productsError}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Category Header */}
            <div className="bg-emerald-50 border-b border-emerald-100">
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-emerald-950 mb-2 capitalize">
                                {currentCategory ? currentCategory.name : slug.replace(/-/g, ' ')}
                            </h1>
                            <p className="text-emerald-800 max-w-2xl">
                                {currentCategory?.description || `Browse our collection of ${slug.replace(/-/g, ' ')}`}
                            </p>
                        </div>
                        {/* Could add sorting/filtering controls here later */}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No products found in this category.</p>
                        <Link href="/categories" className="text-emerald-600 hover:underline mt-4 inline-block">
                            Back to all categories
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {displayProducts.map((product) => (
                            <ProductCard key={product.id} product={product} className="min-w-0" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
