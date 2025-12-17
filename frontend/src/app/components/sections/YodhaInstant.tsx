"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "@/lib/store/hooks";
import { addItemToCart } from "@/lib/store/features/cart/cartSlice";
import { toast } from "sonner";

interface Product {
    _id: string;
    name: string;
    images: { url: string }[];
    description?: string;
    slug: string;
    price: number;
}

export default function YodhaInstant() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/yodha-instant`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
        e.preventDefault();

        try {
            await dispatch(
                addItemToCart({
                    product: {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        qty: 1,
                        image: product.images?.[0]?.url || "",
                    },
                    quantity: 1
                })
            ).unwrap();
            toast.success("Added to cart");
        } catch (error) {
            toast.error("Failed to add to cart");
        }
    };

    return (
        <section
            id="instant"
            className="container mx-auto mb-28 rounded-[40px] bg-[#050505] text-white px-6 md:px-16 py-20 relative overflow-hidden"
        >
            {/* Header */}
            <div className="text-center mb-12 relative z-10">
                <h2 className="font-fraunces text-[2.5rem] md:text-[3.5rem] font-bold">
                    Yodha Instant ⚡
                </h2>
                <p className="text-lg mt-2 opacity-80">
                    Ready-to-Drink mixes. Just add water.
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-center text-gray-400">Loading Instant Products...</p>
            )}

            {/* Grid */}
            {!loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 relative z-10">
                    {products.map((product) => (
                        <Link
                            href={`/products/${product.slug}`}
                            key={product._id}
                            className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333] transition-transform duration-300 hover:scale-105 hover:border-[#ff4500] cursor-pointer flex flex-col relative group"
                        >
                            <div className="h-[200px] mb-5 overflow-hidden rounded-xl">
                                <Image
                                    src={product.images?.[0]?.url || "/placeholder.png"}
                                    alt={product.name}
                                    width={400}
                                    height={300}
                                    className="h-full w-full object-cover opacity-90 rounded-xl"
                                />
                            </div>

                            <h3 className="text-xl font-bold mb-1">{product.name}</h3>

                            <p className="text-gray-300 text-sm mb-4">
                                {product.description || "Delicious & Ready Instantly"}
                            </p>

                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-gray-300 font-bold text-lg ">₹{product.price}</span>
                                <button
                                    onClick={(e) => handleAddToCart(e, product)}
                                    className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
