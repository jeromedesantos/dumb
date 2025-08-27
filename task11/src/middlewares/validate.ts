import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/error";
import { userSchema, productSchema } from "../utils/joi";

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw appError(error.message, 400);
  }
  next();
}

export function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error } = productSchema.validate(req.body);
  if (error) {
    throw appError(error.message, 400);
  }
  next();
}
