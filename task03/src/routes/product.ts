import express from "express";
import {
  readProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { validParam, validBody } from "../middlewares/product";

const router = express.Router();

router.get("/product", readProducts);
router.get("/product/:id", validParam, readProduct);
router.post("/product", validBody, createProduct);
router.put("/product/:id", validParam, validBody, updateProduct);
router.delete("/product/:id", validParam, deleteProduct);

export default router;
