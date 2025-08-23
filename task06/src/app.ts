import express from "express";
import userRoute from "./routes/user";
import postRoute from "./routes/post";
import commentRoute from "./routes/comment";
import errorRoute from "./routes/error";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("*catchall", errorRoute);

app.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝`)
);
