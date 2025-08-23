import express from "express";
import supplierRoutes from "./routes/supplier";
import { errorRoute } from "./routes/404";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", supplierRoutes);
app.use("*catchall", errorRoute);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`
    ░█████╗░██╗░░██╗
    ██╔══██╗██║░██╔╝
    ██║░░██║█████═╝░
    ██║░░██║██╔═██╗░
    ╚█████╔╝██║░╚██╗
    ░╚════╝░╚═╝░░╚═╝`)
);
