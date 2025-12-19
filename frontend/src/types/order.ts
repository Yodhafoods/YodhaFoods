
export type OrderStatus =
    | "PLACED"
    | "CONFIRMED"
    | "SHIPPED"
    | "OUT_FOR_DELIVERY"
    | "DELIVERED"
    | "CANCELLED";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface Order {
    _id: string;
    items: OrderItem[];
    subtotal: number;
    shippingFee?: number;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: "PENDING" | "PAID" | "FAILED";
    shippingAddress: ShippingAddress;
    createdAt: string;
}
