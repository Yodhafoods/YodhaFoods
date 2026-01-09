import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err: any) {
      const message = err?.errors?.[0]?.message || "Invalid request data";
      return res.status(400).json({ message });
    }
  };
