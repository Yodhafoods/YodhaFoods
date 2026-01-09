import { IOrder } from "../models/Order.js";

export const getOrderConfirmationTemplate = (order: IOrder, userName: string) => {
    const itemsHtml = order.items
        .map(
            (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        <div style="font-weight: bold;">${item.name}</div>
        <div style="font-size: 12px; color: #666;">Qty: ${item.quantity}</div>
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">
        ₹${item.price * item.quantity}
      </td>
    </tr>
  `
        )
        .join("");

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h1 style="color: #ea580c; text-align: center;">Order Confirmed!</h1>
      <p>Hi ${userName},</p>
      <p>Thank you for your order. We have received your payment and are getting your order ready!</p>
      
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">Order ID: #${order._id.toString().slice(-6)}</p>
        <p style="margin: 5px 0 0; color: #666;">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p style="margin: 5px 0 0; color: #666;">Payment Method: Razorpay</p>
        <p style="margin: 5px 0 0; color: #666;">Status: ${order.status}</p>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6; text-align: left;">
            <th style="padding: 10px;">Item</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding: 10px; font-weight: bold; text-align: right;">Total Paid</td>
            <td style="padding: 10px; font-weight: bold; text-align: right;">₹${order.totalAmount}</td>
          </tr>
        </tfoot>
      </table>

      <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
        This email was sent from Yodha Foods.
      </p>
    </div>
  `;
};
