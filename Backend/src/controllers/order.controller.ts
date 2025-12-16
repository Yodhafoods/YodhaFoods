import { Request, Response } from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

/**
 * POST /api/orders
 * Create order
 */
export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { items, shippingAddress, totalAmount } = req.body;

        // Validate product availability + build snapshot
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product || !product.isActive) {
                return res
                    .status(400)
                    .json({ message: `Product not available` });
            }

            if (product.stock < item.quantity) {
                return res
                    .status(400)
                    .json({ message: `${product.name} is out of stock` });
            }

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();

            orderItems.push({
                productId: product._id,
                name: product.name,
                price: product.discountPrice ?? product.price,
                quantity: item.quantity,
                image: product.images?.[0]?.url || "",
            });
        }

        const order = await Order.create({
            userId,
            items: orderItems,
            shippingAddress,
            totalAmount,
        });

        return res.status(201).json({
            message: "Order placed successfully",
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

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })
            .lean();

        return res.json({ orders });
    } catch (error) {
        console.error("Get My Orders Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

/**
 * GET /api/orders/:id
 * Get single order (user can access only own order)
 */
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const { id } = req.params;

        const order = await Order.findOne({ _id: id, userId });

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
