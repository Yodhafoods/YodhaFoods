// routes/order.routes.ts
import { Router } from "express";
import { postOrder } from "../controllers/postOrder.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

/**
 * POST /order/action
 * body:
 * {
 *   orderId: string,
 *   productId?: string,
 *   action: "CANCEL" | "RETURN"
 * }
 */
router.post("/action",requireAuth, postOrder);

export default router;
