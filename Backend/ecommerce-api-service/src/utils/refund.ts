// utils/refund.ts
import { Order } from "../types/order.js";

export const shouldInitiateRefund = (order: Order): boolean => {
  return order.paymentMethod === "ONLINE" && !order.isRefunded;
};

export const initiateRefund = async (orderId: string, amount: number) => {
  console.log(`Refund initiated for ${orderId}, amount ${amount}`);
};
