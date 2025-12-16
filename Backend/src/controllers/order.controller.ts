import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * POST /api/orders
 */
export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let subtotal = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = item.productId as any;

    if (!product.isActive || product.stock < item.quantity) {
      return res.status(400).json({
        message: `Product ${product.name} unavailable`,
      });
    }

    subtotal += product.price * item.quantity;

    orderItems.push({
      productId: product._id,
      name: product.name,
      price: product.price, // snapshot
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    userId,
    items: orderItems,
    subtotal,
    total: subtotal, // tax/shipping later
  });

  // Clear cart AFTER order creation
  await Cart.deleteOne({ userId });

  return res.status(201).json({
    message: "Order created",
    order,
  });
};
