import { Request, Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

type CartRequest = Request & {
  guestId?: string;
};

/**
 * Utility: resolve cart owner
 */
const getCartQuery = (req: CartRequest) => {
  return req.user
    ? { userId: req.user.id }
    : { guestId: req.guestId };
};

/**
 * POST /api/cart/add
 */
export const addToCart = async (req: CartRequest, res: Response) => {
  try {
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

    const cartQuery = getCartQuery(req);
    let cart = await Cart.findOne(cartQuery);

    if (!cart) {
      cart = await Cart.create({
        ...cartQuery,
        items: [{ productId, quantity }],
      });
    } else {
      const item = cart.items.find(
        (i: any) => i.productId.toString() === productId
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
 */
export const getCart = async (req: CartRequest, res: Response) => {
  try {
    const cartQuery = getCartQuery(req);

    const cart = await Cart.findOne(cartQuery).populate(
      "items.productId",
      "name price discountPrice images stock isActive"
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
 */
export const updateCartItem = async (req: CartRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const cartQuery = getCartQuery(req);
    const cart = await Cart.findOne(cartQuery);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (i: any) => i.productId.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity === 0) {
      cart.items.splice(index, 1);
    } else {
      const product = await Product.findById(productId);
      if (!product || !product.isActive) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      cart.items[index].quantity = quantity;
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
 */
export const removeFromCart = async (req: CartRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const cartQuery = getCartQuery(req);

    const cart = await Cart.findOne(cartQuery);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId
    );

    await cart.save();
    return res.json({ message: "Item removed", cart });
  } catch (err) {
    console.error("Remove cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/cart/clear
 */
export const clearCart = async (req: CartRequest, res: Response) => {
  try {
    const cartQuery = getCartQuery(req);
    await Cart.deleteOne(cartQuery);
    return res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
