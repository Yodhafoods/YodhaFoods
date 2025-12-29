import { Response } from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { GuestRequest } from "../middlewares/guest.middleware.js";

/**
 * Resolve cart owner (user OR guest)
 */
const resolveCartFilter = (req: GuestRequest) => {
  if (req.user) return { userId: req.user.id };
  if (req.guestId) return { guestId: req.guestId };
  return null;
};

/**
 * POST /api/cart/add
 */
export const addToCart = async (req: GuestRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const cartFilter = resolveCartFilter(req);
    if (!cartFilter) {
      return res.status(400).json({ message: "Cart owner not resolved" });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await Cart.findOne(cartFilter);

    // Case 1: Cart does not exist → create
    if (!cart) {
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const newCart = await Cart.create({
        ...cartFilter,
        items: [{ productId, quantity }],
      });

      return res.json({ message: "Added to cart", cart: newCart });
    }

    // Case 2: Cart exists → update item
    const item = cart.items.find(
      (item :any) => item.productId.toString() === productId
    );

    if (item) {
      if (product.stock < item.quantity + quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      item.quantity += quantity;
    } else {
      if (product.stock < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return res.json({ message: "Added to cart", cart });

  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/cart
 */
export const getCart = async (req: GuestRequest, res: Response) => {
  try {
    const cartFilter = resolveCartFilter(req);
    if (!cartFilter) return res.json({ items: [] });

    const cart = await Cart.findOne(cartFilter).populate(
      "items.productId",
      "name price discountPrice images stock isActive"
    );

    return res.json(cart ?? { items: [] });
  } catch (error) {
    console.error("Get cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/cart/update
 */
export const updateCartItem = async (req: GuestRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity < 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const cartFilter = resolveCartFilter(req);
    if (!cartFilter) {
      return res.status(400).json({ message: "Cart owner not resolved" });
    }

    const cart = await Cart.findOne(cartFilter);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (item: any) => item.productId.toString() === productId
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

  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/cart/remove/:productId
 */
export const removeFromCart = async (req: GuestRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const cartFilter = resolveCartFilter(req);
    if (!cartFilter) {
      return res.status(400).json({ message: "Cart owner not resolved" });
    }

    const cart = await Cart.findOne(cartFilter);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item: any) => item.productId.toString() !== productId
    );

    await cart.save();
    return res.json({ message: "Item removed", cart });

  } catch (error) {
    console.error("Remove cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE /api/cart/clear
 */
export const clearCart = async (req: GuestRequest, res: Response) => {
  try {
    const cartFilter = resolveCartFilter(req);
    if (!cartFilter) {
      return res.status(400).json({ message: "Cart owner not resolved" });
    }

    await Cart.deleteOne(cartFilter);
    return res.json({ message: "Cart cleared" });

  } catch (error) {
    console.error("Clear cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
