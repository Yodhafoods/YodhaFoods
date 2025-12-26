import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { guestMiddleware } from "../middlewares/guest.middleware.js";
// import { requireAuth } from "../middlewares/auth.js"; // optional

const router = Router();

/**
 * Guest middleware MUST run before cart handlers
 * - Creates guestId cookie
 * - Enables guest carts
 */
router.use(guestMiddleware);

/**
 * Cart APIs (work for both guest & logged-in users)
 */
router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

export default router;
