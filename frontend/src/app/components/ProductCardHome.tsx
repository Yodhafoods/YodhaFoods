"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    addItemToCart,
    updateCartItemQty,
    removeItemFromCart,
} from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";

export interface Product {
    id: number | string;
    name: string;
    price: number;
    img: string;
    badge?: string;
    slug: string;
}

interface ProductCardProps {
    product: Product;
    className?: string;
}

export default function ProductCardHome({ product, className }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);
    const cartItem = cart.find((item) => item.id === String(product.id));

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await dispatch(
                addItemToCart({
                    product: {
                        id: String(product.id),
                        name: product.name,
                        price: product.price,
                        qty: 1,
                        image: product.img,
                    },
                    quantity: 1
                })
            ).unwrap();
            toast.success("Added to cart");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    const handleIncrement = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (cartItem) {
            try {
                await dispatch(updateCartItemQty({ productId: String(product.id), quantity: cartItem.qty + 1 })).unwrap();
            } catch (error) {
                toast.error("Failed to update quantity");
            }
        }
    };

    const handleDecrement = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (cartItem) {
            try {
                if (cartItem.qty <= 1) {
                    await dispatch(removeItemFromCart(String(product.id))).unwrap();
                    toast.success("Removed from cart");
                } else {
                    await dispatch(updateCartItemQty({ productId: String(product.id), quantity: cartItem.qty - 1 })).unwrap();
                }
            } catch (error) {
                toast.error("Failed to update quantity");
            }
        }
    };

    return (
        <Link
            href={`/shop/${product.slug}`}
            className={`
        bg-gray-50 rounded-2xl p-2.5 sm:p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-sm 
        relative group w-full snap-start
        flex flex-col h-full border border-gray-200
        ${className || ""}
      `}
        >
            {/* Badge */}
            {product.badge && (
                <span className="absolute top-3 left-3 bg-white text-green-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow z-10">
                    {product.badge}
                </span>
            )}

            {/* Image Box */}
            {/* Mobile: aspect-3/4 to match CategoryCard. Desktop: Fixed heights to match original ProductCard. */}
            <div className="aspect-3/4 sm:aspect-auto w-full sm:h-40 md:h-48 lg:h-52 rounded-xl overflow-hidden bg-gray-100 relative">
                <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Title */}
            <div className="mt-3">
                <p className="font-bold text-xs sm:text-sm line-clamp-2 leading-tight text-gray-800" title={product.name}>
                    {product.name}
                </p>
            </div>

            {/* Price + Add to Cart */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-2">
                <p className="text-gray-900 font-bold text-xs sm:text-sm">₹{product.price}</p>

                <div className="shrink-0">
                    {cartItem ? (
                        <div className="group-hover:bg-orange-600 flex items-center justify-between bg-black text-white px-1.5 sm:px-2 py-1.5 rounded-full font-bold gap-1 sm:gap-2 transition-colors min-w-[60px] sm:min-w-[80px]">
                            <button
                                onClick={handleDecrement}
                                className="text-white hover:bg-gray-800 p-0.5 rounded-full cursor-pointer transition-colors shrink-0 flex items-center justify-center"
                            >
                                <RiSubtractFill size={12} />
                            </button>
                            <span className="text-xs">{cartItem.qty}</span>
                            <button
                                onClick={handleIncrement}
                                className="text-white hover:bg-gray-800 p-0.5 rounded-full cursor-pointer transition-colors shrink-0 flex items-center justify-center"
                            >
                                <RiAddFill size={12} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white px-3 py-1.5 rounded-full font-bold group-hover:bg-orange-600 transition-colors text-xs cursor-pointer whitespace-nowrap"
                        >
                            <span className="sm:hidden">Add</span>
                            <span className="hidden sm:inline">Add to Cart</span>
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}
