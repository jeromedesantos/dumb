import express from "express";
import cookieParser from "cookie-parser";
import error from "./routes/error";
import user from "./routes/user";
import thread from "./routes/thread";
import { join } from "path";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/error";
import { corsSocket, corsMiddleware } from "./utils/cors";
import http from "http";
import { Server } from "socket.io";

config();

const url = process.env.BASE_URL;
const PORT = new URL(url as string).port;
const app = express();
const server = http.createServer(app);
const io = new Server(server, corsSocket);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use("/api/v1/uploads", express.static(join(__dirname, "uploads")));
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use((req, res, next) => {
  (req as any).io = io;
  next();
});

app.use("/api/v1", user);
app.use("/api/v1", thread);
app.use("*catchall", error);
app.use(errorHandler);

server.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝
    
    𝗟𝗼𝗰𝗮𝗹: ${url}
    `)
);
