// services/return.service.ts
import { canReturnOrder } from "../utils/returnPolicy.js";
import { initiateRefund, shouldInitiateRefund } from "../utils/refund.js";

const RETURN_WINDOW_DAYS = 7;

export const returnOrderService = async (
  order: any,
  productId?: string
) => {
  if (!canReturnOrder(order.status)) {
    throw new Error("Order not eligible for return");
  }

  if (!order.deliveredAt) {
    throw new Error("Delivery date missing");
  }

  const daysPassed =
    (Date.now() - new Date(order.deliveredAt).getTime()) /
    (1000 * 60 * 60 * 24);

  if (daysPassed > RETURN_WINDOW_DAYS) {
    throw new Error("Return window expired");
  }

  let refundAmount = 0;

  if (productId) {
    const item = order.items.find((i: any) => i.productId === productId);
    if (!item) throw new Error("Product not found");

    item.status = "CANCELLED"; // or RETURNED if you track it
    refundAmount = item.price * item.quantity;
  } else {
    order.items.forEach((i: any) => {
      i.status = "CANCELLED";
      refundAmount += i.price * i.quantity;
    });
  }

  if (shouldInitiateRefund(order)) {
    await initiateRefund(order._id, refundAmount);
    order.isRefunded = true;
  }

  await order.save();
};
