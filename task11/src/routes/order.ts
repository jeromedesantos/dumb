import { Router } from "express";
import { auth, admin } from "../middlewares/auth";
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
} from "../controllers/order";

const router = Router();

router.get("/order", auth, admin, readOrders);
router.get("/order/:id", auth, readOrder);
router.post("/order", auth, validate(orderSchema), createOrder);
router.put(
  "/order/:id",
  auth,
  admin,
  validate(updateOrderSchema),
  isExist("order"),
  updateOrder
);
router.patch(
  "/order/:id/restore",
  auth,
  admin,
  isExist("order", false),
  restoreOrder
);
router.delete("/order/:id", auth, admin, isExist("order"), deleteOrder);

export default router;
