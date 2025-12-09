// import "express";

// declare module "express" {
//   interface Request {
//     user?: { id: string; role: "user" | "admin" };
//   }
// }
// src/types/express.d.ts
import type { UserRole } from "../models/User.js";

declare global {
  namespace Express {
    interface AuthUser {
      id: string;
      role: UserRole;
    }

    interface Request {
      user?: AuthUser;
    }
  }
}

// make this a module
export {};
