import { Response, NextFunction } from "express";
import { GuestRequest } from "./guest.middleware.js";

export const requireCheckoutAuth = (
  req: GuestRequest,
  res: Response,
  next: NextFunction
) => {
  // If user is NOT logged in
  if (!req.user) {
    return res.status(401).json({
      message: "Please login to continue checkout",
      code: "AUTH_REQUIRED",
    });
  }

  // User is logged in → allow checkout
  next();
};
