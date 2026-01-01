import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        exp?: number;
      };
    }
  }
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

interface DecodedToken {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.at; // access token cookie name: "at"

  if (!token) {
    console.error("[Auth] No token found. Cookies present:", Object.keys(req.cookies || {}));
    // console.debug("[Auth] Full Cookies:", req.cookies); // Uncomment for deep debug
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as DecodedToken;
    req.user = { id: decoded.sub, role: decoded.role, exp: decoded.exp };
    next();
  } catch (err) {
    console.error("[Auth] Token verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.at;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as DecodedToken;
    req.user = { id: decoded.sub, role: decoded.role, exp: decoded.exp };
  } catch (err) {
    // Token invalid or expired? Just continue as guest.
    // We don't want to block access to public pages/cart if token is weird.
    // The frontend should handle refresh separately if needed.
  }

  next();
};
