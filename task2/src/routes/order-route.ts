import express from "express";
import {
  readOrders,
  createOrders,
  updateOrders,
  deleteOrders,
} from "../controllers/order-controller";

const router = express.Router();

router.get("/", readOrders);
router.post("/", createOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrders);

export default router;
