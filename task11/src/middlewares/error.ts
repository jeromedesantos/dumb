import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  res.status(err.statusCode || 500).json({
    status: err.name || "error",
    message: err.message || "Internal Server Error!",
  });
}
