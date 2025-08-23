import { Request, Response, NextFunction } from "express";

export function validUser(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;
  if (typeof name !== "string" || typeof email !== "string") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (name === "" || email === "") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Request cannot empty!",
    });
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Email not valid!",
    });
  }
  if (email.length > 100) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Email cannot more than 100 characters!",
    });
  }
  if (name.length > 30) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Username cannot more than 30 characters!",
    });
  }
  next();
}

export function validProduct(req: Request, res: Response, next: NextFunction) {
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

export function validOrder(req: Request, res: Response, next: NextFunction) {
  const { userId, productId, quantity } = req.body;
  if (
    typeof userId !== "number" ||
    typeof productId !== "number" ||
    typeof quantity !== "number"
  ) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (userId < 0 || productId < 0 || quantity < 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Request cannot empty!",
    });
  }
  next();
}
