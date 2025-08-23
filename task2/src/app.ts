import express from "express";
import productRoute from "./routes/product-route";
import orderRoute from "./routes/order-route";
import errorRoute from "./routes/error-route";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2/products", productRoute);
app.use("/api/v2/orders", orderRoute);
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
