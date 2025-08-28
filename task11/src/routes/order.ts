import { Router } from "express";
import { auth, admin } from "../middlewares/auth";
import { isModelExist } from "../middlewares/existing";
import { validateOrder } from "../middlewares/validate";
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
router.get("/order/:id", auth, admin, readOrder);
router.post("/order", auth, validateOrder, createOrder);
router.put(
  "/order/:id",
  auth,
  admin,
  validateOrder,
  isModelExist("order"),
  updateOrder
);
router.patch(
  "/order/:id",
  auth,
  admin,
  isModelExist("order", false),
  restoreOrder
);
router.delete("/order/:id", auth, admin, isModelExist("order"), deleteOrder);

export default router;
