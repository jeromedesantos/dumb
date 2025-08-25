import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { appError } from "../utils/error";

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    // const token = req.headers.authorization?.split(" ")[1];
    if (token === undefined) {
      throw appError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    (req as any).user = decoded as any;
    next();
  } catch (err) {
    throw appError("Invalid Token", 401);
  }
}

export function supplier(req: Request, res: Response, next: NextFunction) {
  const { role } = (req as any).user;
  if (role !== "supplier") {
    throw appError("Unauthorized", 401);
  }
  next();
}

export function nonAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    // const token = req.headers.authorization?.split(" ")[1];
    if (token !== undefined) {
      throw appError("You are already logged in", 400);
    }
    next();
  } catch (err) {
    next(err);
  }
}
