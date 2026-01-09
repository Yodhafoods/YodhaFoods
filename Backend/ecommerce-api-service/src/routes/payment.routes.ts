import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-razorpay-order", requireAuth, createRazorpayOrder);
router.post("/verify", requireAuth, verifyRazorpayPayment);

export default router;
