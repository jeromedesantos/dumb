import { Router } from "express";
import { upload } from "../utils/multer";
import { productSchema } from "../utils/joi";
import { validate } from "../middlewares/validate";
import { auth, admin } from "../middlewares/auth";
import { isExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
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
  validate(productSchema),
  isFile,
  saveFile,
  createProduct
);
router.put(
  "/product/:id",
  auth,
  admin,
  isExist("product"),
  upload.single("image"),
  validate(productSchema),
  saveFile,
  updateProduct
);
router.patch(
  "/product/:id/restore",
  auth,
  admin,
  isExist("product", false),
  restoreProduct
);
router.delete("/product/:id", auth, isExist("product"), deleteProduct);

export default router;
