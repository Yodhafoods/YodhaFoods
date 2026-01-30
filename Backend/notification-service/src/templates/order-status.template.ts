import { OrderStatus } from "../types/notification-event.js";

const subjectMap: Record<OrderStatus, string> = {
  PLACED: "Order Placed ✅",
  CONFIRMED: "Order Confirmed 📦",
  SHIPPED: "Order Shipped 🚚",
  OUT_FOR_DELIVERY: "Out for Delivery 🛵",
  DELIVERED: "Order Delivered 🎉",
  CANCELLED: "Order Cancelled ❌",
};

export function orderStatusTemplate(
  orderId: string,
  status: OrderStatus
) {
  return {
    subject: subjectMap[status],
    html: `
      <p>Your order <b>#${orderId.slice(-6)}</b> is now <b>${status}</b>.</p>
    `,
  };
}
