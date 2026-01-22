// utils/cancelPolicy.ts
import { OrderStatus } from "../types/order.js";

export const canCancelOrder = (status: OrderStatus): boolean => {
  return ["PLACED", "CONFIRMED"].includes(status);
};
