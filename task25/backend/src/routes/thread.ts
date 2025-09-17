import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getThreads, postThread } from "../controllers/thread";
import { upload } from "../utils/multer";
import { saveFile } from "../middlewares/file";

const router = Router();

router.get("/thread", auth, getThreads);
router.post("/thread", auth, upload.single("image"), saveFile, postThread);

export default router;
