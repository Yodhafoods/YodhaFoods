// src/types/express.d.ts
import type { UserRole } from "../models/User.js";

declare global {
  namespace Express {
    // Extend the existing User interface (used by req.user)
    interface User {
      id: string;
      role: UserRole;
    }
  }
}

export { };
