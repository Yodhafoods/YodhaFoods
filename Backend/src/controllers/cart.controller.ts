import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import { ICartItem } from "../schemas/cart.schema.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

/* ----------------------------------------------------
  Helpers
---------------------------------------------------- */

const getUserId = (req: Request): string | null => {
  // assumes auth middleware attaches req.user
  // @ts-ignore
  return req.user?.id || null;
};

const isValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);

/* ----------------------------------------------------
  GET /api/cart
  - Logged-in user → DB cart
  - Guest → frontend handles cart
---------------------------------------------------- */
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      // Guest user → frontend cart
      return res.json({ items: [] });
    }

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price discountPrice images stock isActive"
    );

    return res.json(cart || { items: [] });
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ----------------------------------------------------
  POST /api/cart/add
  - Authenticated users only
---------------------------------------------------- */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    if (!isValidObjectId(productId) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i: ICartItem) => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    }

    return res.json(cart);
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ----------------------------------------------------
  PUT /api/cart/update
---------------------------------------------------- */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId, quantity } = req.body;

    if (!isValidObjectId(productId) || quantity < 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i: ICartItem) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter(
        (i: ICartItem) => i.productId.toString() !== productId
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    return res.json(cart);
  } catch (err) {
    console.error("Update cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ----------------------------------------------------
  DELETE /api/cart/remove/:productId
---------------------------------------------------- */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { productId } = req.params;
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i: ICartItem) => i.productId.toString() !== productId
    );

    await cart.save();
    return res.json(cart);
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ----------------------------------------------------
  DELETE /api/cart/clear
---------------------------------------------------- */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Cart.deleteOne({ userId });
    return res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ----------------------------------------------------
  POST /api/cart/merge
  - Called AFTER login
  - Merges guest cart (localStorage) into DB cart
---------------------------------------------------- */
export const mergeCart = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { items } = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid cart payload" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    for (const guestItem of items) {
      if (
        !isValidObjectId(guestItem.productId) ||
        guestItem.quantity <= 0
      ) {
        continue;
      }

      const product = await Product.findById(guestItem.productId);
      if (!product || !product.isActive) continue;

      const existing = cart.items.find(
        (i: ICartItem) => i.productId.toString() === guestItem.productId
      );

      if (existing) {
        existing.quantity += guestItem.quantity;
      } else {
        cart.items.push({
          productId: guestItem.productId,
          quantity: guestItem.quantity,
        });
      }
    }

    await cart.save();
    return res.json(cart);
  } catch (err) {
    console.error("Merge cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
