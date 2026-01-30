// controllers/postOrder.controller.ts
import { Request, Response } from "express";
import { cancelOrderService } from "../services/cancel.service.js";
import { returnOrderService } from "../services/return.service.js";
import Order from "../models/Order.js";

export const postOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, action } = req.body;
    // action: "CANCEL" | "RETURN"

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (action === "CANCEL") {
      await cancelOrderService(order, productId);
    } else if (action === "RETURN") {
      await returnOrderService(order, productId);
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    return res.status(200).json({
      message: `${action} successful`
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    });
  }
};
