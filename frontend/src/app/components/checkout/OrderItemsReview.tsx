"use client";

import { useAppSelector } from "@/lib/store/hooks";


export default function OrderItemsReview() {
    const items = useAppSelector((state) => state.cart.items);

    return (
        <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>

            {items.length === 0 && (
                <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover"
                        />

                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        </div>

                        <p className="font-medium">
                            ₹{item.price * item.qty}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
