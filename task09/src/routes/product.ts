import { Router } from "express";
import { auth } from "../middlewares/auth";
import {
  readProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/product", auth, readProducts);
router.get("/product/:id", auth, readProduct);
router.post("/product", auth, createProduct);
router.put("/product/:id", auth, updateProduct);
router.delete("/product/:id", auth, deleteProduct);

export default router;
