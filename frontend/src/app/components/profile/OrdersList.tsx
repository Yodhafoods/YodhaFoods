"use client";

import { useOrders } from "@/hooks/useOrders";
import OrderCard from "./OrderCard";

export default function OrdersList() {
    const { orders, loading } = useOrders();

    if (loading) return <p className="text-gray-500">Loading orders...</p>;
    if (!orders.length) return <p>No orders yet.</p>;

    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </div>
    );
}
