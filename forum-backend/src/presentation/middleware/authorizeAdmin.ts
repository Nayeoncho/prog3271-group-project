import { Request, Response, NextFunction, RequestHandler } from "express";

export const authorizeAdmin: RequestHandler<any> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.___ !== "___") {
    res.status(405).json({ message: "Access denied. Admins only." });
    return;
  }
  next();
};
