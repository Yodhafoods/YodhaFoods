import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshTokenController,
  logoutController,
  meController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/refresh", refreshTokenController);
router.post("/logout", logoutController);
router.get("/verify-email", verifyEmailController);
router.get("/me", requireAuth, meController);

// Forgot password
// router.post("/forgot-password", [body("email").isEmail()], handleValidationErrors, forgotPasswordController);

// Reset password
// router.post(
//   "/reset-password",
//   [body("id").isString(), body("token").isString(), body("newPassword").isLength({ min: 6 })],
//   handleValidationErrors,
//   resetPasswordController
// );

export default router;
