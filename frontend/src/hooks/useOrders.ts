import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { api, FetchError } from "@/lib/api";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get<{ orders: Order[] }>("/api/orders")
            .then((res) => setOrders(res.orders))
            .catch((err) => {
                // If 404, just mean no orders found yet — treat as empty list
                if (err instanceof FetchError && err.status === 404) {
                    setOrders([]);
                } else {
                    console.error("Failed to fetch orders:", err);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return { orders, loading };
}
