import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  mergeCart,
} from "../controllers/cart.controller.js";
import { requireAuth } from "../middlewares/auth.js";


const router = Router();

/* ----------------------------------------------------
  Public (Guest-safe)
---------------------------------------------------- */

/**
 * GET /api/cart
 * - Guest → returns empty cart (frontend uses localStorage)
 * - Auth → returns DB cart
 */
router.get("/", getCart);

/* ----------------------------------------------------
  Authenticated Routes
---------------------------------------------------- */

/**
 * POST /api/cart/add
 */
router.post("/add", requireAuth, addToCart);

/**
 * PUT /api/cart/update
 */
router.put("/update", requireAuth, updateCartItem);

/**
 * DELETE /api/cart/remove/:productId
 */
router.delete("/remove/:productId", requireAuth, removeFromCart);

/**
 * DELETE /api/cart/clear
 */
router.delete("/clear", requireAuth, clearCart);

/**
 * POST /api/cart/merge
 * - Called immediately after login
 * - Merges guest cart into user cart
 */
router.post("/merge", requireAuth, mergeCart);

export default router;
