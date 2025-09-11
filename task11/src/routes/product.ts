import { Router } from "express";
import { upload } from "../utils/multer";
import { productSchema } from "../utils/joi";
import { validate } from "../middlewares/validate";
import { auth, isAdmin, isWarehouse } from "../middlewares/auth";
import { isExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
import {
  readProducts,
  searchProducts,
  readProduct,
  createProduct,
  updateProduct,
  restoreProduct,
  deleteProduct,
} from "../controllers/product";

const router = Router();

router.get("/product", auth, isWarehouse, readProducts);
router.get("/product/search", auth, isWarehouse, searchProducts);
router.get("/product/:id", auth, isWarehouse, readProduct);
router.post(
  "/product",
  auth,
  isWarehouse,
  upload.single("image"),
  validate(productSchema),
  isFile,
  saveFile,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  isWarehouse,
  isExist("product"),
  upload.single("image"),
  validate(productSchema),
  saveFile,
  updateProduct
);
router.patch(
  "/product/:id/restore",
  auth,
  isAdmin,
  isExist("product", true),
  restoreProduct
);
router.delete(
  "/product/:id",
  auth,
  isWarehouse,
  isExist("product"),
  deleteProduct
);

export default router;
