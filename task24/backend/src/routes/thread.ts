import { Router } from "express";
import { auth, nonAuth, isSame, isExist } from "../middlewares/auth";
import { getThreads } from "../controllers/thread";

const router = Router();

router.get("/thread", auth, getThreads);

export default router;
