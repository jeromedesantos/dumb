import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/app-error";

export function validStocks(req: Request, res: Response, next: NextFunction) {
  const { updates } = req.body;
  if (!Array.isArray(updates)) {
    throw appError("Updates Must Array!", 400);
  }
  updates.forEach((update: any) => {
    const { id, stock } = update;
    if (typeof id !== "number" || typeof stock !== "number") {
      throw appError("Wrong Request Data Type!", 400);
    }
    if (id < 0 || stock < 0) {
      throw appError("Request Cannot Empty", 400);
    }
  });
  next();
}
