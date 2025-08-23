import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/app-error";

export function errorRoute(req: Request, res: Response, next: NextFunction) {
  try {
    throw appError("Route Not Found!", 404);
  } catch (err) {
    next(err);
  }
}
