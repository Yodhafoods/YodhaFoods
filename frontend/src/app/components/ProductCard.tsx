"use client"
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addItemToCart, updateCartItemQty, removeItemFromCart } from "@/lib/store/features/cart/cartSlice";
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
    className?: string; // Correctly added className prop
}

export default function ProductCard({ product, className }: ProductCardProps) {
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
        bg-white rounded-2xl p-2.5 sm:p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
        relative group min-w-[75%] sm:min-w-[45%] lg:min-w-0 snap-start
        block flex flex-col h-full
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
            <div className="h-32 sm:h-40 md:h-48 lg:h-52 rounded-xl overflow-hidden bg-gray-100 relative w-full">
                <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>

            {/* Title + Price + Add to Cart */}
            {/* Title + Price + Add to Cart */}
            {/* Title + Price + Add to Cart */}
            {/* Title + Price + Add to Cart */}
            <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 flex-grow">
                <div>
                    <p className="font-bold text-sm sm:text-lg line-clamp-1">{product.name}</p>
                    <p className="text-gray-900 font-semibold text-sm sm:text-base">₹{product.price}</p>
                </div>

                <div className="mt-auto md:mt-0">
                    {cartItem ? (
                        <div className="group-hover:bg-orange-600 flex items-center justify-between bg-black text-white px-1 py-1.5 sm:px-3 sm:py-2 rounded-full font-bold w-full md:w-auto gap-2 transition-colors">
                            <button
                                onClick={handleDecrement}
                                className="text-white hover:bg-gray-800 p-1 rounded-full cursor-pointer transition-colors"
                            >
                                <RiSubtractFill size={14} className="sm:w-4 sm:h-4" />
                            </button>
                            <span className="text-xs sm:text-sm">{cartItem.qty}</span>
                            <button
                                onClick={handleIncrement}
                                className="text-white hover:bg-gray-800 p-1 rounded-full cursor-pointer transition-colors"
                            >
                                <RiAddFill size={14} className="sm:w-4 sm:h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="w-full md:w-auto bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold group-hover:bg-orange-600 transition-colors text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                        >
                            <span className="md:hidden">Add</span>
                            <span className="hidden md:inline">Add to Cart</span>
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
}
