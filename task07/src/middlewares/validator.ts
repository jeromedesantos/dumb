import { Request, Response, NextFunction } from "express";
import { appError } from "../utils/app-error";

export function validBody(req: Request, res: Response, next: NextFunction) {
  const { senderId, receiverId, amount } = req.body;
  if (
    typeof senderId !== "number" ||
    typeof receiverId !== "number" ||
    typeof amount !== "number"
  ) {
    throw appError("Wrong request data type!", 400);
  }
  if (senderId < 0 || receiverId < 0 || amount < 0) {
    throw appError("Request cannot empty", 400);
  }
  next();
}
