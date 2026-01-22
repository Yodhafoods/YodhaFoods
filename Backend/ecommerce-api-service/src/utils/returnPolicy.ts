// utils/returnPolicy.ts
import { OrderStatus } from "../types/order.js";

export const canReturnOrder = (status: OrderStatus): boolean => {
  return status === "DELIVERED";
};
