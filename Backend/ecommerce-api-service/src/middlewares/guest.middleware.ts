import { Request, Response, NextFunction } from "express";
import { v4 as uuid } from "uuid";

export interface GuestRequest extends Request {
  guestId?: string;
}

export const guestMiddleware = (
  req: GuestRequest,
  res: Response,
  next: NextFunction
) => {
  // Logged-in users don't need guestId
  if (req.user) return next();

  let guestId = req.cookies?.guestId;

  if (!guestId) {
    guestId = uuid();

    res.cookie("guestId", guestId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "none",               // ⭐ REQUIRED for cross-site
      secure: true,                   // ⭐ REQUIRED on HTTPS
      path: "/",                      
    });
  }

  req.guestId = guestId;
  next();
};
