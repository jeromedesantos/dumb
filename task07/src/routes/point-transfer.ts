import { Router } from "express";
import { validBody } from "../middlewares/validator";
import { transferPoints, getUserPoints } from "../controllers/point-transfer";

const router = Router();

router.post("/transfer-points", validBody, transferPoints);
router.get("/users/points", getUserPoints);

export default router;
