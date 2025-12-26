import { v4 as uuid } from "uuid";
import { Request, Response, NextFunction } from "express";

export const guestMiddleware = (
  req: Request & { guestId?: string },
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    let guestId = req.cookies?.guestId;

    if (!guestId) {
      guestId = uuid();
      res.cookie("guestId", guestId, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    req.guestId = guestId;
  }
  next();
};
