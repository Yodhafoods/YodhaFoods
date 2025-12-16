"use client"

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, updateQuantity } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";
import { RiAddFill, RiSubtractFill } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";

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
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);
    const cartItem = cart.find((item) => item.id === String(product.id));

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(
            addToCart({
                id: String(product.id),
                name: product.name,
                price: product.price,
                qty: 1,
                image: product.img,
            })
        );
        toast.success("Added to cart");
    };

    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (cartItem) {
            dispatch(updateQuantity({ id: String(product.id), qty: cartItem.qty + 1 }));
        }
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (cartItem) {
            dispatch(updateQuantity({ id: String(product.id), qty: cartItem.qty - 1 }));
        }
    };

    return (
        <Link
            href={`/products/${product.slug}`}
            className="
        bg-white rounded-2xl p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
        relative group min-w-[75%] sm:min-w-[45%] lg:min-w-0 snap-start
        block
      "
        >
            {/* Badge */}
            {product.badge && (
                <span className="absolute top-4 left-4 bg-white text-green-700 px-3 py-1 rounded-full text-xs font-bold shadow z-10">
                    {product.badge}
                </span>
            )}

            {/* Image Box */}
            <div className="h-72 rounded-xl overflow-hidden bg-gray-100 relative">
                <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Title + Price + Add to Cart */}
            <div className="mt-3 flex items-center justify-between">
                <div>
                    <p className="font-bold text-lg">{product.name}</p>
                    <p className="text-gray-900 font-semibold">₹{product.price}</p>
                </div>
                {cartItem ? (
                    <div className="group-hover:bg-orange-600 flex items-center gap-3 bg-black text-white px-3 py-2 rounded-full font-bold">
                        <button
                            onClick={handleDecrement}
                            className="text-white hover:bg-gray-900 px-1 md:px-2 py-1 rounded-full cursor-pointer  transition-colors"
                        >
                            <RiSubtractFill />
                        </button>
                        <span className="text-sm">{cartItem.qty}</span>
                        <button
                            onClick={handleIncrement}
                            className="text-white hover:bg-gray-900 px-1 md:px-2 py-1 rounded-full cursor-pointer  transition-colors"
                        >
                            <RiAddFill />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white px-4 py-2 rounded-full font-bold group-hover:bg-orange-600 transition-colors text-sm cursor-pointer"
                    >
                        <span className="sm:hidden">Add</span>
                        <span className="hidden sm:inline">Add to Cart</span>
                    </button>
                )}
            </div>
        </Link>
    );
}
