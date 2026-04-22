// Extend Express Request type to include user field
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username?: string;
        role: "user" | "admin" | "super";
        iat?: number;
        exp?: number;
      };
    }
  }
}

export {};
