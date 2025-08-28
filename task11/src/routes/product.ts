import { Router } from "express";
import { upload } from "../utils/multer";
import { auth, admin } from "../middlewares/auth";
import { isModelExist } from "../middlewares/existing";
import { isFile, saveFileProduct } from "../middlewares/file";
import { validateProduct } from "../middlewares/validate";
import {
  readProducts,
  readProduct,
  createProduct,
  updateProduct,
  restoreProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/product", auth, readProducts);
router.get("/product/:id", auth, readProduct);
router.post(
  "/product",
  auth,
  upload.single("image"),
  isFile,
  validateProduct,
  saveFileProduct,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  isModelExist("product"),
  upload.single("image"),
  validateProduct,
  saveFileProduct,
  updateProduct
);
router.patch(
  "/product/:id",
  auth,
  admin,
  isModelExist("product", false),
  restoreProduct
);
router.delete("/product/:id", auth, isModelExist("product"), deleteProduct);

export default router;
