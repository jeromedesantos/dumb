import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { appError } from "../utils/error";

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const { token } = req.cookies;
    if (token === undefined) {
      throw appError("Unauthorized", 401);
    }
    const decoded = verifyToken(token);
    (req as any).user = decoded as any;
    next();
  } catch (err) {
    throw appError("You must Login to access!", 401);
  }
}

export function admin(req: Request, res: Response, next: NextFunction) {
  const { role } = (req as any).user;
  if (role !== "admin") {
    throw appError("Only admin can access this route!", 401);
  }
  next();
}

export function nonAuth(req: Request, res: Response, next: NextFunction) {
  console.log("cookies", req.cookies);
  const { token } = req.cookies;
  if (token) {
    console.log("ayook");
    throw appError("You're already logged in", 400);
  }
  next();
}
