import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/User.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
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
    console.error("[Auth] No token found. Cookies:", Object.keys(req.cookies || {}));
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET) as DecodedToken;
    req.user = { id: decoded.sub, role: decoded.role };
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
