"use client"

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "@/lib/store/hooks";
import { addToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";

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
                <button
                    onClick={handleAddToCart}
                    className="bg-black text-white px-4 py-2 rounded-full font-bold group-hover:bg-orange-600 transition-colors text-sm cursor-pointer"
                >
                    Add to Cart
                </button>
            </div>
        </Link>
    );
}
