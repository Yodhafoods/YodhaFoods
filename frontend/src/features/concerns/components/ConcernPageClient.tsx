"use client";

import { useState, useEffect } from "react";
import ConcernSelector from "./ConcernSelector";
import ProductCard from "@/features/products/components/ProductCard";
import { api } from "@/lib/api";
import { ChevronRight, Loader2 } from "lucide-react";
import { Product } from "@/types";

interface SubCategory {
    name: string;
    slug: string;
    _id?: string;
    isActive?: boolean;
}

interface ConcernPageClientProps {
    headerContent: React.ReactNode;
    emptyState: React.ReactNode;
}

export default function ConcernPageClient({ headerContent, emptyState }: ConcernPageClientProps) {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [activeConcernSlug, setActiveConcernSlug] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [productsLoading, setProductsLoading] = useState(false);

    // 1. Fetch "Shop By Concern" Category & its Subcategories
    useEffect(() => {
        const fetchConcerns = async () => {
            try {
                // Assuming the main category slug is 'shop-by-concern'
                const response: any = await api.get("/api/categories/shop-by-concern");
                if (response?.category?.subCategories) {
                    const activeSubs = response.category.subCategories.filter((s: any) => s.isActive);
                    setSubCategories(activeSubs);
                    if (activeSubs.length > 0) {
                        setActiveConcernSlug(activeSubs[0].slug);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch concerns:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConcerns();
    }, []);

    // 2. Fetch Products when Active Concern Changes
    useEffect(() => {
        if (!activeConcernSlug) return;

        const fetchProducts = async () => {
            setProductsLoading(true);
            try {
                // api to fetch products by subcategory
                // Route: /api/products/category/:categorySlug/:subCategorySlug
                const response: any = await api.get(`/api/products/category/shop-by-concern/${activeConcernSlug}`);
                setProducts(response.products || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            } finally {
                setProductsLoading(false);
            }
        };

        fetchProducts();
    }, [activeConcernSlug]);

    const activeConcernName = subCategories.find(c => c.slug === activeConcernSlug)?.name || "Shop By Concern";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
            </div>
        );
    }

    return (
        <div className="mb-8">
            <div className="pt-2 pb-4">
                {headerContent}
                <ConcernSelector
                    concerns={subCategories}
                    activeConcernId={activeConcernSlug}
                    onSelect={setActiveConcernSlug}
                />
            </div>

            {/* Product Section */}
            <div className="container mx-auto px-4 -mt-2">
                <p className="text-2xl font-bold text-gray-900 pb-4 flex items-center gap-2">{activeConcernName}
                    <span><ChevronRight size={24} className="text-pink-400 font-bold" /></span></p>
                {productsLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-10 h-10 text-pink-300 animate-spin" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <>
                        {emptyState}
                    </>
                )}
            </div>
        </div>
    );
}
