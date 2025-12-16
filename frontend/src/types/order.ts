export type OrderStatus =
    | "PLACED"
    | "CONFIRMED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export interface Order {
    _id: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
}
