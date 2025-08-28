import { Request, Response, NextFunction } from "express";
import { userSchema, productSchema, orderSchema } from "../utils/joi";
import { appError } from "../utils/error";

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

export function validateOrder(req: Request, res: Response, next: NextFunction) {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    throw appError(error.message, 400);
  }
  next();
}
