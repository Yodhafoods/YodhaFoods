import crypto from "crypto";
import User from "../models/User.js";
import { Request, Response } from "express";
import { emitNotification } from "../services/notification.producer.js";
import bcrypt from "bcryptjs";


// =====================================================================
// FORGOT PASSWORD (forget password without login user)
// =====================================================================
export const forgotWithoutLoginPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "If email exists, link sent" });
  
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
  
    const resetForgetPasswordLink = `${process.env.FRONTEND_ORIGIN}/reset-password?token=${encodeURIComponent(resetToken)}`;

    try {
      await emitNotification({
        eventType: "FORGOT_PASSWORD",
        email: user.email,
        data: {
          resetPasswordLink: resetForgetPasswordLink,
        },
      });
    } catch (error) {
      console.error("Failed to emit forgot password event:", error);
      return res.status(500).json({ message: "Failed to send reset email" });
    }
  
    res.json({ message: "Password reset email queued" });
  };


// =====================================================================
// RESET PASSWORD
// =====================================================================

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query.token as any;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: "Token and password required" });
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ message: "Token invalid or expired" });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.json({ message: "Password reset successful" });
};

