import { JwtPayload } from "jsonwebtoken";

// Extend Express Request type to include user field
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
