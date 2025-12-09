// src/routes/auth.routes.ts
import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController
  //verifyEmailController 
} from "../controllers/auth.controller";
import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validation";
import rateLimit from "express-rate-limit";

const router = Router();

// Rate limiter for login: 5 attempts per IP per minute
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts from this IP, please try again later" }
});

// Register
router.post(
  "/register",
  [
    body("name").isString().isLength({ min: 2 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  handleValidationErrors,
  registerUser
);

// Verify email
// router.post(
//   "/verify-email",
//   [body("id").isString(), body("token").isString()],
//   handleValidationErrors
//   verifyEmailController
// );

// Login with rate limiter
router.post(
  "/login",
  loginLimiter,
  [body("email").isEmail(), body("password").isString().isLength({ min: 6 })],
  handleValidationErrors,
  loginUser
);

// Refresh (reads cookie)
router.post("/refresh", refreshTokenController);

// Logout
router.post("/logout", logoutController);

// Forgot password
router.post("/forgot-password", [body("email").isEmail()], handleValidationErrors, forgotPasswordController);

// Reset password
// router.post(
//   "/reset-password",
//   [body("id").isString(), body("token").isString(), body("newPassword").isLength({ min: 6 })],
//   handleValidationErrors,
//   resetPasswordController
// );

export default router;
