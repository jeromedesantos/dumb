import { Router } from "express";
import { auth } from "../middlewares/auth";
import { isOrderDeleted, isOrderExist } from "../middlewares/existing";
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

router.get("/order", auth, readOrders);
router.get("/order/:id", auth, readOrder);
router.post("/order", auth, validateOrder, createOrder);
router.put("/order/:id", auth, validateOrder, isOrderDeleted, updateOrder);
router.patch("/order/:id", auth, isOrderExist, restoreOrder);
router.delete("/order/:id", auth, isOrderDeleted, deleteOrder);

export default router;
