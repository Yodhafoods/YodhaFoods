import { Request, Response } from "express";
import crypto from "crypto";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

/**
 * POST /api/webhooks/razorpay
 * Razorpay server → our backend
 */
export const razorpayWebhook = async (req: Request, res: Response) => {
  try {
    /**
     * Razorpay sends signature in header
     */
    const signature = req.headers["x-razorpay-signature"] as string;

    /**
     * 1️⃣ Verify webhook signature (MANDATORY)
     * We must use RAW body here
     */
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    /**
     * 2️⃣ Parse webhook payload
     */
    const event = JSON.parse(req.body.toString());
    const eventType = event.event;

    /**
     * Razorpay payment entity
     */
    const payment = event.payload.payment.entity;
    const razorpayOrderId = payment.order_id;

    /**
     * 3️⃣ Find our order using Razorpay order ID
     */
    const order = await Order.findOne({
      "payment.razorpayOrderId": razorpayOrderId,
    });

    if (!order) {
      // Razorpay may retry webhooks; we must respond 200
      return res.status(200).json({ ignored: true });
    }

    /**
     * 4️⃣ Handle SUCCESSFUL payment
     */
    if (eventType === "payment.captured") {
      // Idempotency check (VERY IMPORTANT)
      if (order.paymentStatus !== "PAID") {
        order.paymentStatus = "PAID";
        order.status = "CONFIRMED";
        order.payment!.razorpayPaymentId = payment.id;

        await order.save();

        /**
         * Deduct stock ONLY ONCE
         */
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -item.quantity },
          });
        }
      }
    }

    /**
     * 5️⃣ Handle FAILED payment
     */
    if (eventType === "payment.failed") {
      order.paymentStatus = "FAILED";
      await order.save();
    }

    /**
     * Razorpay expects 200 OK
     */
    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return res.status(500).json({ message: "Webhook error" });
  }
};
