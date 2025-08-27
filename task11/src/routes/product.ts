import { Router } from "express";
import { upload } from "../utils/multer";
import { auth } from "../middlewares/auth";
import { isProductDeleted, isProductExist } from "../middlewares/existing";
import { isFileErr, isFile, saveFileProduct } from "../middlewares/file";
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
  isFileErr,
  isFile,
  saveFileProduct,
  validateProduct,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  upload.single("image"),
  isFileErr,
  saveFileProduct,
  validateProduct,
  isProductDeleted,
  updateProduct
);
router.patch("/product/:id", auth, isProductExist, restoreProduct);
router.delete("/product/:id", auth, isProductDeleted, deleteProduct);

export default router;
