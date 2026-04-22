import { Request, Response, NextFunction, RequestHandler } from "express";

export const authorizeSuper: RequestHandler<any> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (req.user.role !== "super") {
    res.status(403).json({ message: "Acess denied. SUper users only." });
    return;
  }

  next();
};
