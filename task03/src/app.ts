import express from "express";
import productRoute from "./routes/product";
import errorRoute from "./routes/error";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", productRoute);
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
