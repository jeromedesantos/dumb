import { Router } from "express";
import { validPost } from "../middlewares/validator";
import {
  readPosts,
  readPost,
  readPostSummary,
  readPostComment,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";

const router = Router();

router.get("/", readPosts);
router.get("/comments-summary", readPostSummary);
router.get("/:id/comments", readPostComment);
router.get("/:id", readPost);
router.post("/", validPost, createPost);
router.put("/:id", validPost, updatePost);
router.delete("/:id", deletePost);

export default router;
