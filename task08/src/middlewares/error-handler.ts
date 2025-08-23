import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
}
