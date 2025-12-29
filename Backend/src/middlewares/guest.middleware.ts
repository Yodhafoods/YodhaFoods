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
  if (!req.user) {
    let guestId = req.cookies?.guestId;

    if (!guestId) {
      guestId = uuid();
      res.cookie("guestId", guestId, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    req.guestId = guestId;
  }
  next();
};
