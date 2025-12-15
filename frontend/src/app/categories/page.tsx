'use client';

import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-[4/3] bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-16 text-center text-red-500">
                <p>Error loading categories: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    console.log('CategoriesPage: categories', categories, 'loading', loading, 'error', error);

    return (
        <div className="min-h-screen">
            {/* Header/Hero Section */}
            <div className="flex justify-center items-center">
                <div className=" px-4 py-6 md:py-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Shop Your Products by Category
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl text-center">
                        Discover our wide range of healthy and delicious products harvested from nature's goodness.
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="w-full px-4 py-8 flex justify-center">
                {categories.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No categories found.</p>
                    </div>
                ) : (
                    <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {categories.map((category) => (
                            <CategoryCard key={category._id} category={category} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}