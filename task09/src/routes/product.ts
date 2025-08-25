import { Router } from "express";
import { auth, supplier } from "../middlewares/auth";
import { validateProduct } from "../middlewares/validate";
import {
  readProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/product", auth, supplier, readProducts);
router.get("/product/:id", auth, supplier, readProduct);
router.post("/product", auth, supplier, validateProduct, createProduct);
router.put("/product/:id", auth, supplier, validateProduct, updateProduct);
router.delete("/product/:id", auth, supplier, deleteProduct);

export default router;
