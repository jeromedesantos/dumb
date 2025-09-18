import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getReplyById, postReplyById } from "../controllers/reply";
import { upload } from "../utils/multer";
import { saveFile } from "../middlewares/file";

const router = Router();

router.get("/thread/:id/reply", auth, getReplyById);
router.post(
  "/thread/:id/reply",
  auth,
  upload.single("image"),
  saveFile,
  postReplyById
);

export default router;
