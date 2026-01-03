"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Heart, Minus, Plus, Flame, Check } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItemToCart } from "@/features/cart/store/cartSlice";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedPackIndex, setSelectedPackIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setQuantity(1);
            setSelectedImageIndex(0);
            setSelectedPackIndex(0);
        }
    }, [product]);

    if (!mounted || !isOpen || !product) return null;

    const currentPack = product.packs?.[selectedPackIndex] || {
        price: 0,
        label: "Standard",
        stock: 0,
        weightInGrams: 0
    };

    const images = product.images && product.images.length > 0
        ? product.images
        : [{ url: "/placeholder.png", public_id: "placeholder" }];

    const handleAddToCart = async () => {
        try {
            await dispatch(
                addItemToCart({
                    product: {
                        id: `${product._id}-${currentPack.label}`,
                        productId: String(product._id),
                        name: `${product.name} (${currentPack.label})`,
                        price: currentPack.price,
                        qty: quantity,
                        image: images[0].url,
                        pack: currentPack.label,
                        stock: currentPack.stock
                    },
                    quantity: quantity
                })
            ).unwrap();
            toast.success("Added to cart");
            onClose();
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        router.push("/checkout");
    };

    const originalPrice = Math.round(currentPack.price * 1.2); // Fake original price for demo
    const subtotal = currentPack.price * quantity;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 isolate">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        style={{ zIndex: -1 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-auto z-10"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm cursor-pointer"
                        >
                            <X size={24} className="text-gray-500 hover:text-gray-900" />
                        </button>

                        {/* LEFT COLUMN: Images */}
                        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col gap-4">
                            {/* Main Image */}
                            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-inner">
                                <Image
                                    src={images[selectedImageIndex].url}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-4"
                                />
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImageIndex(idx)}
                                            className={`
                                                relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all
                                                ${selectedImageIndex === idx ? "border-orange-500 shadow-md ring-2 ring-orange-100" : "border-transparent bg-white hover:border-gray-200"}
                                            `}
                                        >
                                            <Image
                                                src={img.url}
                                                alt={`View ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Details */}
                        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col h-full overflow-y-auto custom-scrollbar">
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm mb-3 bg-rose-50 w-fit px-3 py-1 rounded-full">
                                    <Flame size={16} className="fill-rose-500" />
                                    <span>{Math.floor(Math.random() * 20) + 5} sold in last {Math.floor(Math.random() * 10) + 12} hours</span>
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                                    {product.name}
                                </h2>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-3">
                                    {product.description || "Experience the authentic taste of tradition with Yodha Foods. Pure, natural, and crafted with care for your well-being."}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-gray-400 text-lg line-through font-semibold">
                                    ₹{originalPrice}
                                </span>
                                <span className="text-3xl font-black text-orange-600">
                                    ₹{currentPack.price}
                                </span>
                                {product.packs && product.packs.length > 1 && (
                                    <span className="text-xs font-bold text-gray-500 ml-auto uppercase tracking-wider">
                                        Pack: {currentPack.label}
                                    </span>
                                )}
                            </div>

                            {/* Packs (if multiple) */}
                            {product.packs && product.packs.length > 1 && (
                                <div className="mb-8">
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                                        Select Pack Size
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.packs.map((pack, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedPackIndex(idx)}
                                                className={`
                                                    px-4 py-2 rounded-lg text-sm font-bold border-2 transition-all flex items-center gap-2
                                                    ${selectedPackIndex === idx
                                                        ? "border-orange-500 bg-orange-50 text-orange-700"
                                                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                                                    }
                                                `}
                                            >
                                                {selectedPackIndex === idx && <Check size={14} strokeWidth={3} />}
                                                {pack.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity & Subtotal */}
                            <div className="mb-8">
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">
                                    Quantity
                                </label>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 cursor-pointer hover:text-orange-600 hover:scale-105 transition-all"
                                        >
                                            <Minus size={18} strokeWidth={2.5} />
                                        </button>
                                        <span className="text-xl font-bold text-gray-900 w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 cursor-pointer hover:text-orange-600 hover:scale-105 transition-all"
                                        >
                                            <Plus size={18} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-xs text-gray-500 font-bold mb-0.5">Subtotal</span>
                                        <span className="block text-xl font-black text-gray-900">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3 mt-auto">
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 cursor-pointer transition-all shadow-lg shadow-green-200 active:scale-[0.98] uppercase tracking-wider text-sm"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => toast.info("Added to Wishlist")}
                                        className="w-14 flex items-center justify-center border-2 border-gray-200 rounded-xl hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all group"
                                    >
                                        <Heart size={24} className="group-hover:fill-red-500 transition-all" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleBuyNow}
                                    className="w-full bg-black text-white font-bold py-4 rounded-xl cursor-pointer hover:bg-orange-600 transition-all shadow-xl active:scale-[0.98] uppercase tracking-wider text-sm"
                                >
                                    Buy It Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
