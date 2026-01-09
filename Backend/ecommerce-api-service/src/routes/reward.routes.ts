import express from "express";
import { RewardController } from "../controllers/reward.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/spin", requireAuth, RewardController.spin);
router.get("/wallet", requireAuth, RewardController.getWallet);
router.post("/apply-coins", requireAuth, RewardController.applyCoins);
router.get("/history", requireAuth, RewardController.getHistory);

export default router;
