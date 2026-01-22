export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentMethod = "ONLINE" | "COD";

export interface Order {
  id: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  isRefunded: boolean;
  totalAmount: number;
}