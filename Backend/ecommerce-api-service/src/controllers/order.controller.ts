import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js";
import CoinWallet from "../models/CoinWallet.js";
import mongoose from "mongoose";
import { GuestRequest } from "../middlewares/guest.middleware.js";
import { emitNotification } from "../services/notification.producer.js";
import { OrderStatus } from "../types/notification-event.js";
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
    /**
     * 3️⃣ Validate products & calculate subtotal
     */
    for (const item of cart.items) {
      const product = item.productId as any;

      if (!product || !product.isActive) {
        console.warn(`[Order] Skipping unavailable item during order creation: ${item.productId}`);
        continue;
      }

      // Check stock
      let currentStock = product.stock || 0;
      let selectedPack: any = null;

      // Pack resolution logic (Align with RewardController)
      if (item.pack && product.packs) {
        selectedPack = product.packs.find((p: any) => p.label === item.pack);
      }

      // Fallback to default if not found (though Cart should usually ensure validity)
      if (!selectedPack && product.packs && product.packs.length > 0) {
        selectedPack = product.packs.find((p: any) => p.isDefault) || product.packs[0];
      }

      if (selectedPack) {
        currentStock = selectedPack.stock;
      }

      if (currentStock < item.quantity) {
        const msg = `${product.name} (${selectedPack?.label || 'Default'}) is out of stock`;
        console.error(`[Order] Stock error: ${msg}`);
        return res.status(400).json({
          message: msg,
        });
      }

      // Price resolution
      let price = 0;
      if (selectedPack) {
        price = selectedPack.discountPrice && selectedPack.discountPrice > 0
          ? selectedPack.discountPrice
          : selectedPack.price;
      } else {
        price = product.price || 0;
      }

      if (!price) {
        const msg = `Price not found for ${product.name}`;
        console.error(`[Order] Price error: ${msg}`);
        return res.status(400).json({
          message: msg
        });
      }

      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        pack: selectedPack?.label, // verify if Order model supports pack field? It should.
        image: product.images?.[0]?.url || "",
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "No valid items in order (all items unavailable)" });
    }

    /**
     * 3.5 Calculate Discounts (Coins)
     */
    // SECURE: Read from Cart, NOT request body
    const coinsApplied = cart.appliedCoins || 0;
    let discount = 0;
    let coinsRedeemed = 0;

    // Start a session for atomic coin deduction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      if (coinsApplied && Number(coinsApplied) > 0) {
        const wallet = await CoinWallet.findOne({ userId }).session(session);

        // Return 400 for business logic failure instead of 500
        if (!wallet || wallet.balance < Number(coinsApplied)) {
          console.error(`[Order] Insufficient coins. Wallet: ${wallet?.balance}, Applied: ${coinsApplied}`);
          await session.abortTransaction();
          return res.status(400).json({ message: "Insufficient coin balance" });
        }

        // Verify Logic: Max 20% of subtotal
        const maxDiscount = Math.floor(subtotal * 0.20);
        const maxCoinsUsable = maxDiscount * 10;

        const coinsToUse = Math.min(Number(coinsApplied), maxCoinsUsable, wallet.balance);

        coinsRedeemed = coinsToUse;
        discount = coinsRedeemed / 10;

        // Deduct coins
        wallet.balance -= coinsRedeemed;
        wallet.lifetimeRedeemed = (wallet.lifetimeRedeemed || 0) + coinsRedeemed;
        await wallet.save({ session });
      }

      // Calculate Final Total
      // Delivery logic: if subtotal > 299 free, else 40
      const shippingFee = subtotal > 299 ? 0 : 40;
      const totalAmount = Math.max(0, subtotal + shippingFee - discount);

      /**
       * 4️⃣ Create order
       */
      const order = await Order.create([{
        userId,
        items: orderItems,
        subtotal,
        shippingFee,
        discount,
        coinsRedeemed,
        totalAmount,
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
      }], { session });

      /**
       * 5️⃣ Clear USER cart after order creation
       */
      await Cart.deleteOne({ userId }).session(session);

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        message: "Order created successfully",
        order: order[0], // Order.create returns array if passed array or with session
      });

    } catch (err: any) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
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
POST /api/orders/:id/cancel
User cancels own order


/**
 * PUT /api/orders/:id/status
 * Admin updates order status
 */

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: OrderStatus };

    const allowedStatuses: OrderStatus[] = [
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

    // Populate user to get email
    const order = await Order.findById(id).populate("userId");
    if (!order || !order.userId) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Prevent unnecessary updates (optional but good)
    if (order.status === status) {
      return res.json({
        message: "Order status unchanged",
        order,
      });
    }

    order.status = status;
    await order.save();

    /**
     * Emit notification event (ASYNC, NON-BLOCKING)
     */
    try {
      const user = order.userId as any;

      await emitNotification({
        eventType: "ORDER_STATUS_CHANGED",
        email: user.email,
        data: {
          orderId: order._id.toString(),
          status,
        },
      });
    } catch (eventErr) {
      console.error("Failed to emit order status notification:", eventErr);
      // Do NOT fail admin operation
    }

    return res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
