import { Router } from "express";
import { auth, isAdmin, isOrderSame } from "../middlewares/auth";
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

router.get("/order", auth, readOrders);
router.get("/order/search", auth, searchOrders);
router.get("/order/:id", auth, readOrder);
router.post("/order", auth, isOrderSame, validate(orderSchema), createOrder);
router.put(
  "/order/:id",
  auth,
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
router.delete("/order/:id", auth, isExist("order"), deleteOrder);

export default router;
