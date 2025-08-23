import { Router } from "express";
import { validProduct } from "../middlewares/validator";
import {
  readProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/", readProducts);
router.get("/:id", readProduct);
router.post("/", validProduct, createProduct);
router.put("/:id", validProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
