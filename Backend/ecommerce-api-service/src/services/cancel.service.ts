// services/cancel.service.ts
import { canCancelOrder } from "../utils/cancelPolicy.js";
import { initiateRefund, shouldInitiateRefund } from "../utils/refund.js";

export const cancelOrderService = async (
  order: any,
  productId?: string
) => {
  if (!canCancelOrder(order.status)) {
    throw new Error(`Order cannot be cancelled in ${order.status} state`);
  }

  let refundAmount = 0;

  if (productId) {
    const item = order.items.find((i: any) => i.productId === productId);
    if (!item) throw new Error("Product not found");

    item.status = "CANCELLED";
    refundAmount = item.price * item.quantity;
  } else {
    order.status = "CANCELLED";
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
