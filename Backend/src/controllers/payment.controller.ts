import { Request, Response } from "express";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import crypto from "crypto";
import Product from "../models/Product.js";

/**
 * POST /api/payments/create-razorpay-order
 */
export const createRazorpayOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { orderId } = req.body;

    // 1️⃣ Fetch order
    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({ message: "Order already paid" });
    }

    // 2️⃣ Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `order_${order._id}`,
    });

    // 3️⃣ Save Razorpay order id
    order.payment = {
      razorpayOrderId: razorpayOrder.id,
    };
    await order.save();

    // 4️⃣ Send details to frontend
    return res.json({
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID, // public key
    });
  } catch (error) {
    console.error("Create Razorpay Order Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/payments/verify
 */
export const verifyRazorpayPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    // 1️⃣ Fetch order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 2️⃣ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // 3️⃣ Mark order paid
    order.paymentStatus = "PAID";
    order.status = "CONFIRMED";
    order.payment = {
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    };

    await order.save();

    // 4️⃣ Deduct stock SAFELY (AFTER payment)
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    return res.json({
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};