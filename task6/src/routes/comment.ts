import { Router } from "express";
import { validComment } from "../middlewares/validator";
import {
  readComments,
  readComment,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment";

const router = Router();

router.get("/", readComments);
router.get("/:id", readComment);
router.post("/", validComment, createComment);
router.put("/:id", validComment, updateComment);
router.delete("/:id", deleteComment);

export default router;
