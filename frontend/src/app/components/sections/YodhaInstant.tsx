"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
    _id: string;
    name: string;
    images: { url: string }[];
    description?: string;
}

export default function YodhaInstant() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/category/yodha-instant`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products || []);
            })
            .finally(() => setLoading(false));
    }, []);

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
                        <div
                            key={product._id}
                            className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333] transition-transform duration-300 hover:scale-105 hover:border-[#ff4500] cursor-pointer"
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

                            <p className="text-gray-300 text-sm">
                                {product.description || "Delicious & Ready Instantly"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
