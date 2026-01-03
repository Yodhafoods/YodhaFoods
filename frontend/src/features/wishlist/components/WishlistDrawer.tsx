"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { removeFromWishlist } from "@/features/wishlist/store/wishlistSlice";
import { addItemToCart } from "@/features/cart/store/cartSlice";
import { toast } from "sonner";

interface WishlistDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function WishlistDrawer({ open, onClose }: WishlistDrawerProps) {
    const dispatch = useDispatch();
    const { items } = useSelector((state: RootState) => state.wishlist);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Hydration safety
    if (!isClient) return null;

    const handleAddToCart = (item: any) => {
        // Assuming item.productId is the populated product object
        // And cart expects a specific structure
        const product = item.productId;
        if (!product) return;

        // Use default pack or first pack logic similar to ProductCard
        const defaultPack = product.packs?.[0];
        const price = defaultPack?.price || product.price || 0;
        const stock = defaultPack?.stock || product.stock || 0;

        dispatch(addItemToCart({
            product: {
                id: defaultPack ? `${product._id}-${defaultPack.label}` : String(product._id),
                productId: String(product._id),
                name: defaultPack ? `${product.name} (${defaultPack.label})` : product.name,
                price: price,
                qty: 1,
                image: product.images?.[0]?.url || "",
                pack: defaultPack?.label,
                stock: stock
            },
            quantity: 1
        }) as any).unwrap()
            .then(() => {
                dispatch(removeFromWishlist(String(product._id)) as any);
                toast.success("Moved to cart");
            })
            .catch((err: any) => toast.error(err as string));
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromWishlist(id) as any);
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer (Top to Bottom) */}
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 left-0 right-0 z-70 bg-white shadow-2xl rounded-b-[40px] overflow-hidden max-h-[85vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-full text-orange-600">
                                    <Heart size={24} fill="currentColor" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-gray-900">Your Wishlist</h2>
                                    <p className="text-sm text-gray-500">{items.length} items saved</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors text-gray-800"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* List */}
                        <div className="overflow-y-auto p-6 bg-gray-50 min-h-[300px]">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-80">
                                    <Heart size={64} className="mb-4 text-gray-300" />
                                    <h3 className="text-xl font-bold text-gray-700">Wishlist is Empty</h3>
                                    <p className="max-w-[250px] mx-auto text-gray-500 mt-2">
                                        Explore our collection and save your favorites here.
                                    </p>
                                    <Link href="/shop">
                                        <button onClick={onClose} className="mt-6 px-8 py-3 bg-black text-white rounded-full cursor-pointer text-sm font-bold hover:bg-orange-600 transition-colors">
                                            Start Shopping
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((item: any) => {
                                        if (!item.productId) return null; // Skip invalid
                                        const p = item.productId;
                                        // Ensure key is valid string
                                        const key = typeof p === 'string' ? p : p._id;
                                        return (
                                            <div key={key} className="bg-white rounded-xl p-4 flex gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group relative">
                                                {/* Image */}
                                                <div className="w-24 h-24 shrink-0 bg-gray-100 rounded-lg overflow-hidden relative">
                                                    <Image
                                                        src={p.images?.[0]?.url || "/placeholder.png"}
                                                        alt={p.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 flex flex-col justify-between">
                                                    <Link href={`/shop/${p.slug}`} onClick={onClose}>
                                                        <h4 className="font-bold text-gray-800 line-clamp-1 hover:text-orange-600 transition-colors">
                                                            {p.name}
                                                        </h4>
                                                    </Link>
                                                    <div className="text-orange-600 font-bold text-lg">
                                                        ₹{p.packs?.[0]?.price || p.price || 0}
                                                    </div>

                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => handleAddToCart(item)}
                                                            className="flex-1 bg-black text-white py-2 rounded-full cursor-pointer text-xs font-bold flex items-center justify-center gap-1 hover:bg-orange-600 transition-colors"
                                                        >
                                                            <ShoppingBag size={14} /> Move to Cart
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => handleRemove(p._id)}
                                                    className="absolute top-2 right-2 p-1.5 bg-gray-100 text-gray-500 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Remove"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer / Summary if needed, currently just list */}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
