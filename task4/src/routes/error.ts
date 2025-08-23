import { Request, Response } from "express";

function errorRoute(req: Request, res: Response) {
  res.status(404).json({
    status: "404 Not Found",
    message: "URL not found!",
  });
}

export default errorRoute;
