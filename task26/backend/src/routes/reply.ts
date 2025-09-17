import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getReplyById } from "../controllers/reply";
// import { upload } from "../utils/multer";
// import { saveFile } from "../middlewares/file";

const router = Router();

router.get("/reply/:id", auth, getReplyById);

export default router;
