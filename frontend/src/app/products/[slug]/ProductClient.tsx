"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/store/hooks";
import { addToCart, updateQuantity } from "@/lib/store/features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import RelatedProducts from "./RelatedProducts";

interface Product {
    _id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    images: { url: string }[];
    categoryId?: { _id: string; name: string };
    stock: number;
}

interface ProductClientProps {
    product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(product.images?.[0]?.url || "");

    // Get cart item from Redux
    const cartItem = useAppSelector((state) =>
        state.cart.items.find((item) => item.id === product._id)
    );

    const qty = cartItem ? cartItem.qty : 0;

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                qty: 1, // Start with 1
                image: product.images?.[0]?.url || "",
            })
        );
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2000,
        });
    };

    const incrementQty = () => {
        if (!cartItem) return;
        if (cartItem.qty < product.stock) {
            dispatch(updateQuantity({ id: product._id, qty: cartItem.qty + 1 }));
        }
    };

    const decrementQty = () => {
        if (!cartItem) return;
        // Constraint: product quantity should not be decreased to 0 from here
        if (cartItem.qty > 1) {
            dispatch(updateQuantity({ id: product._id, qty: cartItem.qty - 1 }));
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* LEFT: Image Gallery */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100"
                        >
                            {selectedImage ? (
                                <Image
                                    src={selectedImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    No Image
                                </div>
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        {product.images?.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedImage(img.url)}
                                        className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === img.url
                                            ? "border-orange-500 shadow-lg scale-105"
                                            : "border-transparent hover:border-gray-200"
                                            }`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`Thumbnail ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="space-y-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {product.categoryId && (
                                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                                        {product.categoryId.name}
                                    </span>
                                )}
                                <h1 className="text-2xl md:text-3xl font-orange-600 font-semibold text-gray-900 tracking-tight mb-4">
                                    {product.name}
                                </h1>

                                {/* Rating Placeholder */}
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={18} fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">(4.7/5 Review)</span>
                                </div>

                                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                                    {product.description}
                                </p>
                            </motion.div>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* Price & Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-end gap-4">
                                <span className="text-2xl font-semibold text-gray-900">
                                    ₹{product.price}
                                </span>
                                <span className="text-sm text-gray-500 mb-2">/ per pack</span>
                            </div>

                            {/* Quantity & Add to Cart Logic */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {cartItem ? (
                                    // IF IN CART: Show Quantity Controls
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="flex items-center bg-gray-900 rounded-full px-2 py-1">
                                            <button
                                                onClick={decrementQty}
                                                className={`w-12 h-12 flex items-center justify-center text-white rounded-full transition hover:bg-white/20 ${qty <= 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                disabled={qty <= 1}
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <span className="w-12 text-center text-xl font-bold text-white">
                                                {cartItem.qty}
                                            </span>
                                            <button
                                                onClick={incrementQty}
                                                className="w-12 h-12 flex items-center justify-center text-white rounded-full transition hover:bg-white/20 cursor-pointer"
                                                disabled={cartItem.qty >= product.stock}
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                        <div className="flex-1 text-sm text-green-600 font-medium animate-pulse">
                                            Item in cart!
                                        </div>
                                    </div>
                                ) : (
                                    // IF NOT IN CART: Show Add to Cart Button
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        disabled={product.stock === 0}
                                        className={`flex items-center justify-center gap-2 px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all ${product.stock > 0
                                            ? "bg-gray-900 text-white hover:bg-orange-600 cursor-pointer hover:shadow-xl"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        <ShoppingCart size={22} className="mb-0.5" />
                                        {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                                    </motion.button>
                                )}
                            </div>
                        </motion.div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                <h4 className="font-bold text-orange-900 mb-1">Fast Delivery</h4>
                                <p className="text-xs text-orange-700">Get it within 45 mins in selected areas.</p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                                <h4 className="font-bold text-green-900 mb-1">100% Natural</h4>
                                <p className="text-xs text-green-700">No preservatives, just pure goodness.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {product.categoryId?._id && (
                <RelatedProducts
                    categoryId={product.categoryId._id}
                    currentProductId={product._id}
                />
            )}
        </div>
    );
}
