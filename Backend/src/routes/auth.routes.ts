import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshTokenController,
  logoutController,
  meController,
} from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.get("/me", requireAuth, meController);

export default router;
