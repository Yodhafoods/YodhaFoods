import { Router } from "express";
import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} from "../controllers/order.controller.js"

import { requireAuth, requireAdmin } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { createOrderSchema } from "../schemas/order.schema.js";
import { requireCheckoutAuth } from "../middlewares/requireCheckoutAuth.middleware.js";

const router = Router();

/** ==========================
 *  USER ROUTES
 *  ========================== */

/**
 * POST /api/orders
 * Create new order
 */
router.post("/", requireAuth, requireCheckoutAuth, validate(createOrderSchema), createOrder);

/**
 * GET /api/orders
 * Get logged-in user's orders
 */
router.get("/", requireAuth, getMyOrders);

/**
 * GET /api/orders/:id
 * Get single order (user can access only own order)
 */
router.get("/:id", requireAuth, getOrderById);

// router.post("/", requireAuth, cancelOrderById);

/** ==========================
 *  ADMIN ROUTES
 *  ========================== */

/**
 * PUT /api/orders/:id/status
 * Update order status (admin only)
 */
router.put("/:id/status", requireAuth, requireAdmin, updateOrderStatus);

export default router;
