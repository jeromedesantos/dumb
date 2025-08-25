import { Request, Response, NextFunction } from "express";

function errorRoute(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (err) {
    next(err);
  }
}

export default errorRoute;
