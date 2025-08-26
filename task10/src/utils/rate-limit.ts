import rateLimit from "express-rate-limit";
import { appError } from "./error";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  // message: "terlalu banyak request, ulangi dalam beberapa saat",
  handler: (req, res, next) => {
    next(appError("too many request, please try again later", 429));
  },
});
