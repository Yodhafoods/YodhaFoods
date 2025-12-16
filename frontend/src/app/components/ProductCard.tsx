"use client"

import Image from "next/image";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";

export interface Product {
    id: number | string;
    name: string;
    price: number;
    img: string;
    badge?: string;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

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

    return (
        <div
            className="
        bg-white rounded-2xl p-4 shadow-sm cursor-pointer overflow-hidden
        transition-all duration-300 hover:-translate-y-2 hover:shadow-xl 
        relative group min-w-[75%] sm:min-w-[45%] lg:min-w-0 snap-start
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

                {/* Hover Info */}
                <div
                    className="absolute bottom-0 left-0 w-full p-4 
                     translate-y-full group-hover:translate-y-0 
                     transition-all duration-300 bg-white/95 text-center flex flex-col gap-2"
                >
                    <p className="font-bold text-lg">{product.name}</p>
                    <p className="text-orange-600 font-semibold">₹{product.price}</p>
                    <button
                        onClick={handleAddToCart}
                        className="w-full cursor-pointer bg-orange-600 text-white py-2 rounded-full font-bold hover:bg-orange-700 transition-colors"
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            {/* Title + Price */}
            <div className="mt-3">
                <p className="font-extrabold text-lg">{product.name}</p>
            </div>
        </div>
    );
}
