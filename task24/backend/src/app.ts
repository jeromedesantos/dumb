import cookieParser from "cookie-parser";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { resolve } from "path";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/error";
import { corsSocket, corsMiddleware } from "./utils/cors";
import { authSocket, testSocket } from "./utils/io";
import error from "./routes/error";
import user from "./routes/user";
import thread from "./routes/thread";
import reply from "./routes/reply";
import like from "./routes/like";
import follow from "./routes/follow";

config();

const url = process.env.BASE_URL;
const PORT = new URL(url as string).port;
const app = express();
const server = http.createServer(app);
const io = new Server(server, corsSocket);

io.use(authSocket);
io.on("connection", testSocket);

app.use(cookieParser());
app.use(express.json());
app.use(corsMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/uploads", express.static(resolve(process.cwd(), "uploads")));
app.use((req, res, next) => {
  (req as any).io = io;
  next();
});

app.use("/api/v1", user);
app.use("/api/v1", thread);
app.use("/api/v1", reply);
app.use("/api/v1", like);
app.use("/api/v1", follow);
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
