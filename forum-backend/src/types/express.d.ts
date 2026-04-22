import { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include user field
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "user" | "admin" | "super";
        iat?: number;
        exp?: number;
      };
    }
  }
}
