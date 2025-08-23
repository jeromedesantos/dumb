import { Router } from "express";
import { validStocks } from "../middlewares/validator";
import {
  updateStocks,
  getStocks,
  getSuppliers,
  getProducts,
} from "../controllers/supplier";

const router = Router();

router.put("/suppliers/stock", validStocks, updateStocks);
router.get("/suppliers/stock", getStocks);
router.get("/suppliers", getSuppliers);
router.get("/products", getProducts);

export default router;
