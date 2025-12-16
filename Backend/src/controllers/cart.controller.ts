import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

/**
 * POST /api/cart/add
 * Add product to cart
 */
export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i : any) => i.productId.toString() === productId
      );

      if (item) {
        if (product.stock < item.quantity + quantity) {
          return res.status(400).json({ message: "Insufficient stock" });
        }
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    return res.json({ message: "Added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/cart
 * Get user's cart
 */
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price images stock isActive"
    );

    if (!cart) {
      return res.json({ items: [] });
    }

    return res.json(cart);
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/cart/update
 * Update quantity of a cart item
 */
export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity < 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (i: any) => i.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    return res.json({ message: "Cart updated", cart });
  } catch (err) {
    console.error("Update cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/cart/remove/:productId
 * Remove item from cart
 */
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item : any) => item.productId.toString() !== productId
    );

    await cart.save();
    return res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    console.error("Remove from cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/cart/clear
 * Clear entire cart
 */
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    await Cart.deleteOne({ userId });

    return res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
