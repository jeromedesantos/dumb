import { Router } from "express";
import { upload } from "../utils/multer";
import { auth } from "../middlewares/auth";
import { existingProduct } from "../middlewares/existing";
import { isFileErr, isFile, saveFile } from "../middlewares/file";
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
router.post(
  "/product",
  auth,
  upload.single("image"),
  isFileErr,
  isFile,
  saveFile,
  validateProduct,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  upload.single("image"),
  isFileErr,
  saveFile,
  validateProduct,
  existingProduct,
  updateProduct
);
router.delete("/product/:id", auth, existingProduct, deleteProduct);

export default router;
