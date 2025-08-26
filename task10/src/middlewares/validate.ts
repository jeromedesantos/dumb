import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/error";
import { userSchema, productSchema } from "../utils/joi";

export function validateFile(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.code === "LIMIT_FILE_SIZE") {
    throw appError("file bigger than 2 KB", 413);
  }
  next();
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
  if (req.file === undefined) {
    throw appError("No file uploaded", 400);
  }
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
  if (req.file === undefined) {
    throw appError("No file uploaded", 400);
  }
  const { error } = productSchema.validate(req.body);
  if (error) {
    throw appError(error.message, 400);
  }
  next();
}
