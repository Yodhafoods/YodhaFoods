// src/routes/auth.routes.ts
import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutController
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);

export default router;
