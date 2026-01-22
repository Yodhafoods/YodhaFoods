'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories } from '@/hooks/useCategories'; // Fetching to get current category details
import ProductCardHome from "@/features/products/components/ProductCardHome";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CategoryProductsPage() {
    const params = useParams();
    const slug = params.slug as string;

    const { products, loading: productsLoading, error: productsError } = useProducts(slug);
    // Optional: Fetch category details to display title/description of the specific category
    const { categories } = useCategories();
    const currentCategory = categories.find(c => c.slug === slug);
    console.log(currentCategory);



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
        <div className=" bg-gray-50 flex flex-col">
            <div className="relative overflow-hidden">
                <div className="container mx-auto p-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-wider text-orange-600 uppercase bg-orange-100/80 rounded-full backdrop-blur-sm">
                            Pure & Natural
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-orange-600 mb-2 capitalize tracking-tight leading-tight">
                            {currentCategory ? currentCategory.name : slug.replace(/-/g, ' ')}
                        </h1>
                        <p className="text-lg md:text-xl text-emerald-800/70 max-w-2xl mx-auto font-medium leading-relaxed">
                            {currentCategory?.description || `Discover our premium selection of ${slug.replace(/-/g, ' ')}, sourced directly from nature for your well-being.`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 pt-4 pb-12 flex-grow">
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🍃</div>
                        <p className="text-xl font-semibold text-gray-800 mb-2">No products found here yet.</p>
                        <p className="text-gray-500 mb-6">We're working on stocking this shelf!</p>
                        <Link href="/shop" className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline">
                            Browse all products
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                            {products.map((product) => (
                                <ProductCardHome key={product._id} product={product as any} className="min-w-0" />
                            ))}
                        </div>

                        {/* Explore More CTA */}
                        <div className=" text-center pt-16 pb-8">
                            <div className="inline-flex flex-col items-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Still looking for something specific?</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">Explore our full range of 100% natural products and find exactly what your body needs.</p>
                                <Link
                                    href="/shop"
                                    className="group inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white font-bold text-lg rounded-full hover:bg-orange-700 hover:shadow-xl hover:shadow-orange-200 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    Explore More Products
                                    <span className="group-hover:translate-x-1 transition-transform duration-300"><ArrowRight /> </span>
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
