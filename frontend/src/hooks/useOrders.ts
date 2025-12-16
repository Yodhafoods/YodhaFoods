import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { api } from "@/app/lib/api";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get<{ orders: Order[] }>("/api/orders")
            .then((res) => setOrders(res.orders))
            .finally(() => setLoading(false));
    }, []);

    return { orders, loading };
}
