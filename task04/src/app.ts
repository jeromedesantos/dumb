import express from "express";
import userRoute from "./routes/user";
import postRoute from "./routes/post";
import errorRoute from "./routes/error";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/post", postRoute);
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
