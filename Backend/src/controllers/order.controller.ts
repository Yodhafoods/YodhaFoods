import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import { GuestRequest } from "../middlewares/guest.middleware.js";
/**
 * POST /api/orders
 * Create order from cart + address snapshot
 * (NO PAYMENT HERE)
 */
export const createOrder = async (req: GuestRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { addressId } = req.body;

    if (!addressId) {
      return res.status(400).json({ message: "Address is required" });
    }

    /**
     * 1️⃣ Fetch address (ownership check)
     */
    const address = await Address.findOne({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    /**
     * 2️⃣ Fetch USER cart ONLY
     */
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let subtotal = 0;
    const orderItems = [];

    /**
     * 3️⃣ Validate products & freeze price snapshot
     */
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

      let price = 0;

      // New Pack Logic:
      // If item has a specific 'pack' label (e.g. "250g"), find it in product.packs
      // Otherwise fallback to default pack.
      let selectedPack: any = null;

      if (item.pack && product.packs && product.packs.length > 0) {
        selectedPack = product.packs.find((p: any) => p.label === item.pack);
      }

      // Fallback: use default pack if no specific pack found or requested
      if (!selectedPack && product.packs && product.packs.length > 0) {
        selectedPack = product.packs.find((p: any) => p.isDefault) || product.packs[0];
      }

      if (selectedPack) {
        price =
          selectedPack.discountPrice && selectedPack.discountPrice > 0
            ? selectedPack.discountPrice
            : selectedPack.price;
      } else {
        // Legacy fallback if no packs (should not happen with new schema)
        price = (product as any).price || 0;
      }

      if (!price) {
        return res.status(400).json({
          message: `Price not found for ${product.name} (${item.pack || "Default"})`
        });
      }

      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        image: product.images?.[0]?.url || "",
      });
    }

    /**
     * 4️⃣ Create order
     */
    const order = await Order.create({
      userId,
      items: orderItems,
      subtotal,
      totalAmount: subtotal,
      status: "PLACED",
      paymentStatus: "PENDING",

      shippingAddress: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      },
    });

    /**
     * 5️⃣ Clear USER cart after order creation
     */
    await Cart.deleteOne({ userId });

    return res.status(201).json({
      message: "Order created successfully",
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
    console.error("Get Orders Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/orders/:id
 * User gets own order, admin can access any
 */
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const role = req.user!.role;

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
      "PLACED",
      "CONFIRMED",
      "SHIPPED",
      "OUT_FOR_DELIVERY",
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
