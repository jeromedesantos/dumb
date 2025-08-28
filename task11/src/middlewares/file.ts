import { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import { writeFileSync } from "fs";
import { appError } from "../utils/error";

export function isFile(req: Request, res: Response, next: NextFunction) {
  if (req.file === undefined) {
    throw appError("No file uploaded", 400);
  }
  next();
}

export function saveFileUser(req: Request, res: Response, next: NextFunction) {
  const file = req.file?.originalname as string;
  if (file) {
    const fileName = Date.now() + "-" + file;
    const fileBuffer = req.file?.buffer as any;
    const filePath = resolve("src", "uploads", "user", fileName);
    writeFileSync(filePath, fileBuffer);
    (req as any).file = fileName;
  }
  next();
}

export function saveFileProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const file = req.file?.originalname as string;
  if (file) {
    const fileName = Date.now() + "-" + file;
    const fileBuffer = req.file?.buffer as any;
    const filePath = resolve("src", "uploads", "product", fileName);
    writeFileSync(filePath, fileBuffer);
    (req as any).file = fileName;
  }
  next();
}
