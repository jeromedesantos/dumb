import { Router } from "express";
import { validOrder } from "../middlewares/validator";
import {
  readOrders,
  readOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order";

const router = Router();

router.get("/", readOrders);
router.get("/:id", readOrder);
router.post("/", validOrder, createOrder);
router.put("/:id", validOrder, updateOrder);
router.delete("/:id", deleteOrder);

export default router;
