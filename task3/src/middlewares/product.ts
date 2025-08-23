import { Request, Response, NextFunction } from "express";

export function validParam(req: Request, res: Response, next: NextFunction) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Missing request params!",
    });
  }
  next();
}

export function validBody(req: Request, res: Response, next: NextFunction) {
  if (req.body === null || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Missing request body!",
    });
  }
  const { name, price } = req.body;
  if (typeof name !== "string" || typeof price !== "number") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (name === "" || price < 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Request cannot empty!",
    });
  }
  next();
}
