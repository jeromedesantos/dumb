import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import product from "./routes/product";
import user from "./routes/user";
import error from "./routes/error";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("*catchall", error);
app.use(errorHandler);

function errorHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(err.statusCode || 500).json({
    status: err.name || "error",
    message: err.message || "Internal Server Error!",
  });
}

app.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝`)
);
