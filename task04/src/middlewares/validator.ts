import { Request, Response, NextFunction } from "express";

export function validParam(req: Request, res: Response, next: NextFunction) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Req Params not Found!",
    });
  }
  next();
}

export function validUser(req: Request, res: Response, next: NextFunction) {
  if (req.body === null || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Missing request body!",
    });
  }
  const { username, email } = req.body;
  if (typeof username !== "string" || typeof email !== "string") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (username === "" || email === "") {
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
  if (username.length > 30) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Username cannot more than 30 characters!",
    });
  }
  next();
}

export function validPost(req: Request, res: Response, next: NextFunction) {
  if (req.body === null || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Missing request body!",
    });
  }
  const { title, content, user_id } = req.body;
  if (
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof user_id !== "string"
  ) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (title === "" || content === "" || user_id === "") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Request cannot empty!",
    });
  }
  if (title.length > 100) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Title cannot more than 100 characters!",
    });
  }
  next();
}
