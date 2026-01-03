import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
    addItemToCart,
    updateCartItemQty,
    removeItemFromCart,
} from "@/features/cart/store/cartSlice";
import {
    addToWishlist,
    removeFromWishlist
} from "@/features/wishlist/store/wishlistSlice";
import { toast } from "sonner";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { Heart, Eye } from "lucide-react";
import QuickViewModal from "./QuickViewModal";

import { Product } from "@/types";

interface ProductCardProps {
    product: Product;
    className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
    const dispatch = useAppDispatch();
    const [showQuickView, setShowQuickView] = React.useState(false);
    const defaultPack = product.packs?.[0];
    const cart = useAppSelector((state) => state.cart.items);
    const cartItem = cart.find((item) => item.productId === String(product._id) && item.pack === defaultPack?.label);

    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    // Safe check if productId is populated object or string
    const isInWishlist = wishlistItems.some((item) =>
        (typeof item.productId === 'object' && item.productId?._id === product._id) ||
        item.productId === product._id
    );

    // Fallback price
    const price = defaultPack?.price || 0;
    const imgUrl = product.images?.[0]?.url || "";

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        try {
            await dispatch(
                addItemToCart({
                    product: {
                        id: defaultPack ? `${product._id}-${defaultPack.label}` : String(product._id),
                        productId: String(product._id),
                        name: defaultPack ? `${product.name} (${defaultPack.label})` : product.name,
                        price: price,
                        qty: 1,
                        image: imgUrl,
                        pack: defaultPack?.label,
                        stock: defaultPack?.stock
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
                await dispatch(updateCartItemQty({ productId: String(product._id), quantity: cartItem.qty + 1, pack: defaultPack?.label })).unwrap();
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
                    await dispatch(removeItemFromCart({ productId: String(product._id), pack: defaultPack?.label })).unwrap();
                    toast.success("Removed from cart");
                } else {
                    await dispatch(updateCartItemQty({ productId: String(product._id), quantity: cartItem.qty - 1, pack: defaultPack?.label })).unwrap();
                }
            } catch (error) {
                toast.error("Failed to update quantity");
            }
        }
    };

    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInWishlist) {
            dispatch(removeFromWishlist(String(product._id)));
        } else {
            // Pass full product for optimistic update possibilities
            dispatch(addToWishlist(product));
        }
    };

    return (
        <div
            className={`
        bg-gray-50 rounded-2xl p-2.5 sm:p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-sm 
        relative group w-full snap-start
        flex flex-col h-full border border-gray-200
        ${className || ""}
      `}
        >
            {/* Badge */}
            {product.isFeatured && (
                <span className="absolute top-3 left-3 bg-white text-green-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow z-10">
                    Featured
                </span>
            )}

            {/* Image Box */}
            <div className="aspect-3/4 sm:aspect-auto w-full sm:h-40 md:h-48 lg:h-52 rounded-xl overflow-hidden bg-gray-100 relative group/image">
                <Link href={`/shop/${product.slug}`} className="block w-full h-full">
                    {imgUrl ? (
                        <Image
                            src={imgUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200">
                            <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                    )}
                </Link>

                {/* Hover Icons */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 z-20 translate-x-0 opacity-100 md:translate-x-10 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100">
                    <div className="relative group/btn flex items-center justify-end">
                        <button
                            className={`p-2 rounded-full shadow-md cursor-pointer transition-colors ${isInWishlist ? "bg-orange-600 text-white" : "bg-white text-gray-700 hover:bg-orange-600 hover:text-white"}`}
                            onClick={handleWishlist}
                        >
                            <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                        </button>
                        <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-[10px] font-medium rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
                            {isInWishlist ? "Remove" : "Wishlist"}
                        </span>
                    </div>

                    <div className="relative group/btn hidden md:flex items-center justify-end">
                        <button
                            className="p-2 bg-white rounded-full shadow-md cursor-pointer text-gray-700 hover:bg-orange-600 hover:text-white transition-colors"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowQuickView(true);
                            }}
                        >
                            <Eye size={16} />
                        </button>
                        <span className="absolute right-full mr-2 px-2 py-1 bg-black/80 text-white text-[10px] font-medium rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none backdrop-blur-sm">
                            Quick View
                        </span>
                    </div>
                </div>
            </div>

            {/* Title */}
            <div className="mt-3">
                <Link href={`/shop/${product.slug}`}>
                    <p className="font-bold text-xs sm:text-sm line-clamp-2 leading-tight text-gray-800" title={product.name}>
                        {product.name}
                    </p>
                </Link>
            </div>

            {/* Price + Add to Cart */}
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-2">
                <Link href={`/shop/${product.slug}`}>
                    <p className="text-gray-900 font-bold text-xs sm:text-sm">₹{price}</p>
                </Link>

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
            {/* Quick View Modal */}
            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </div>
    );
};

export default ProductCard;
