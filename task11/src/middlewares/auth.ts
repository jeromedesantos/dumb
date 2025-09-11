import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { appError } from "../utils/error";

export function auth(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  if (token === undefined) {
    throw appError("You must Login to access!", 401);
  }
  const decoded = verifyToken(token);
  (req as any).user = decoded as any;
  next();
}

export function nonAuth(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies;
  if (token) {
    throw appError("You're already logged in!", 400);
  }
  next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const { role } = (req as any).user;
  if (role !== "admin") {
    throw appError("Only admin can access this route!", 401);
  }
  next();
}

export function isWarehouse(req: Request, res: Response, next: NextFunction) {
  const { role } = (req as any).user;
  if (role !== "warehouse" && role !== "admin") {
    throw appError("Only warehouse can access this route!", 401);
  }
  next();
}

export function isFinance(req: Request, res: Response, next: NextFunction) {
  const { role } = (req as any).user;
  if (role !== "finance" && role !== "admin") {
    throw appError("Only finance can access this route!", 401);
  }
  next();
}

export function isSame(req: Request, res: Response, next: NextFunction) {
  const idParam = req.params.id;
  const { id, role } = (req as any).user;

  if (role !== "admin" && idParam !== id) {
    throw appError("You cannot see other user's data!", 400);
  }
  next();
}
