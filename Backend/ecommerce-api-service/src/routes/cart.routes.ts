import { Router } from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { guestMiddleware } from "../middlewares/guest.middleware.js";
import { optionalAuth } from "../middlewares/auth.js";

const router = Router();

/**
 * Enable guest carts
 */
router.use(optionalAuth);
router.use(guestMiddleware);

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeFromCart);
router.delete("/clear", clearCart);

export default router;
