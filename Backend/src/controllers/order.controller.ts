import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * POST /api/orders
 * Create order from cart (NO payment yet)
 */
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    // 1. Load cart
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;
    const orderItems = [];

    // 2. Validate products & calculate price
    for (const item of cart.items) {
      const product = item.productId as any;

      if (!product || !product.isActive) {
        return res.status(400).json({
          message: `Product unavailable`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }

      const price = product.discountPrice ?? product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
      });
    }

    // 3. Create order (CREATED state)
    const order = await Order.create({
      userId,
      items: orderItems,
      subtotal,
      total: subtotal, // tax/shipping later
      status: "CREATED",
    });

    // 4. Clear cart AFTER order creation
    await Cart.deleteOne({ userId });

    return res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/orders
 * Get logged-in user's orders
 */
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (error) {
    console.error("Get My Orders Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/orders/:id
 * User gets own order, admin gets any
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const { id } = req.params;

    const order =
      role === "admin"
        ? await Order.findById(id)
        : await Order.findOne({ _id: id, userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.json({ order });
  } catch (error) {
    console.error("Get Order Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/orders/:id/status
 * Admin updates order status
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "CREATED",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
