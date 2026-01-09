import { sendEmail } from "../services/email.service.js";
import { orderStatusTemplate } from "../templates/order-status.template.js";
import { OrderStatus } from "../types/notification-event.js";

export async function handleOrderStatus(
  email: string,
  orderId: string,
  status: OrderStatus
) {
  const { subject, html } = orderStatusTemplate(orderId, status);
  await sendEmail(email, subject, html);
}
