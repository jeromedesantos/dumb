import express from "express";
import {
  readProducts,
  createProducts,
  updateProducts,
  deleteProducts,
} from "../controllers/product-controller";

const router = express.Router();

router.get("/", readProducts);
router.post("/", createProducts);
router.put("/:id", updateProducts);
router.delete("/:id", deleteProducts);

export default router;
