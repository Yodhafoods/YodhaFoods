import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.post("/add", requireAuth, addToCart);
router.get("/", requireAuth, getCart);
router.put("/update", requireAuth, updateCartItem);
router.delete("/remove/:productId", requireAuth, removeFromCart);
router.delete("/clear", requireAuth, clearCart);

export default router;
