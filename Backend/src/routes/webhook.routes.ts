import { Router } from "express";
import { razorpayWebhook } from "../controllers/webhook.controller.js";

const router = Router();

/**
 * Razorpay webhook endpoint
 * NO auth middleware here
 */
router.post("/razorpay", razorpayWebhook);

export default router;
