import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";

/** requireRole('admin') */
export const requireRole = (role: "admin" | "user") => {
  return async (
    req: Request & { userId?: string },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.userId;
      if (!userId)
        return res.status(401).json({ message: "Not authenticated" });

      const user = await User.findById(userId).select("role");
      if (!user) return res.status(401).json({ message: "User not found" });

      if (user.role !== role)
        return res
          .status(403)
          .json({ message: "Forbidden: insufficient privileges" });

      next();
    } catch (err) {
      console.error("Role middleware error:", err);
      return res.status(500).json({ message: "Server error" });
    }
  };
};
