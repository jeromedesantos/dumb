import { Router } from "express";
import { auth, isAdmin, isFinance } from "../middlewares/auth";
import { orderSchema, updateOrderSchema } from "../utils/joi";
import { validate } from "../middlewares/validate";
import { isExist } from "../middlewares/existing";
import {
  readOrders,
  readOrder,
  createOrder,
  updateOrder,
  restoreOrder,
  deleteOrder,
  searchOrders,
} from "../controllers/order";

const router = Router();

router.get("/order", auth, isFinance, readOrders);
router.get("/order/search", auth, isFinance, searchOrders);
router.get("/order/:id", auth, isFinance, readOrder);
router.post("/order", auth, isFinance, validate(orderSchema), createOrder);
router.put(
  "/order/:id",
  auth,
  isFinance,
  validate(updateOrderSchema),
  isExist("order"),
  updateOrder
);
router.patch(
  "/order/:id/restore",
  auth,
  isAdmin,
  isExist("order", true),
  restoreOrder
);
router.delete("/order/:id", auth, isFinance, isExist("order"), deleteOrder);

export default router;
