import express from "express";

type Req = express.Request;
type Res = express.Response;

function errorRoute(req: Req, res: Res) {
  res.status(404).json({
    status: "404 Not Found",
    message: "URL tidak ditemukan!",
  });
}

export default errorRoute;
