import { Router } from "express";

import { requireAuth } from "../middlewares/auth.js";
import { createOrder } from "../controllers/order.controller.js";

const router = Router();

router.post("/", requireAuth, createOrder);


export default router;
