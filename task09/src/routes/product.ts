import { Router } from "express";
import { auth, admin } from "../middlewares/auth";
import { validateProduct } from "../middlewares/validate";
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
router.post("/product", auth, admin, validateProduct, createProduct);
router.put("/product/:id", auth, admin, validateProduct, updateProduct);
router.delete("/product/:id", auth, admin, deleteProduct);

export default router;
