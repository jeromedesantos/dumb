import { Router } from "express";
import { upload } from "../utils/multer";
import { auth } from "../middlewares/auth";
import { validateFile, validateProduct } from "../middlewares/validate";
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
router.post(
  "/product",
  auth,
  upload.single("image"),
  validateFile,
  validateProduct,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  upload.single("image"),
  validateFile,
  validateProduct,
  updateProduct
);
router.delete("/product/:id", auth, deleteProduct);

export default router;
