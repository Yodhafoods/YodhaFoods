"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "react-toastify";

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    images: { url: string }[];
    category?: { name: string };
    stock: number;
}

interface RelatedProductsProps {
    categoryId: string;
    currentProductId: string;
}

export default function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                // Fetch more than 4 to ensure we have enough after filtering
                const res = await fetch(`http://localhost:5000/api/products?category=${categoryId}&limit=6`);
                const data = await res.json();

                if (data.products) {
                    const filtered = data.products
                        .filter((p: Product) => p._id !== currentProductId)
                        .slice(0, 4);
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

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
        e.preventDefault(); // Prevent navigation if inside a link
        dispatch(
            addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                qty: 1,
                image: product.images?.[0]?.url || "",
            })
        );
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop Related Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link href={`/products/${product.slug}`} key={product._id} className="group cursor-pointer">
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="aspect-[4/5] relative bg-gray-50 overflow-hidden">
                                    <Image
                                        src={product.images[0]?.url || "/placeholder.png"}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Quick Add Button */}
                                    <button
                                        onClick={(e) => handleAddToCart(e, product)}
                                        className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur text-gray-900 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500 hover:text-white shadow-lg z-10"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <div className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                                        {product.category?.name}
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 truncate group-hover:text-orange-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star size={14} fill="currentColor" />
                                            <span className="text-sm font-medium text-gray-500">4.5</span>
                                        </div>
                                        <div className="text-lg font-bold text-gray-900">
                                            ₹{product.price}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide text-sm"
                    >
                        Shop Related Products
                    </Link>
                </div>
            </div>
        </section>
    );
}
