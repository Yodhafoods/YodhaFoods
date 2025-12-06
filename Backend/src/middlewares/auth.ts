import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      (req as any).userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Auth error", error: err });
  }
};
