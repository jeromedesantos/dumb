import { Router } from "express";
import { upload } from "../utils/multer";
import { auth, admin } from "../middlewares/auth";
import { isModelExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
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
  admin,
  upload.single("image"),
  validateProduct,
  isFile,
  saveFile,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  admin,
  isModelExist("product"),
  upload.single("image"),
  validateProduct,
  saveFile,
  updateProduct
);
router.patch(
  "/product/:id/restore",
  auth,
  admin,
  isModelExist("product", false),
  restoreProduct
);
router.delete("/product/:id", auth, isModelExist("product"), deleteProduct);

export default router;
