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
      message: "Name cannot more than 30 characters!",
    });
  }
  next();
}

export function validPost(req: Request, res: Response, next: NextFunction) {
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

export function validComment(req: Request, res: Response, next: NextFunction) {
  const { comment, user_id, post_id } = req.body;
  if (
    typeof comment !== "string" ||
    typeof user_id !== "string" ||
    typeof post_id !== "string"
  ) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Wrong request data type!",
    });
  }
  if (comment === "" || user_id === "" || post_id === "") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Request cannot empty!",
    });
  }
  next();
}
