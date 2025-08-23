import express from "express";
import {
  readPosts,
  readPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post";
import { validParam, validPost } from "../middlewares/validator";

const router = express.Router();

router.get("/", readPosts);
router.get("/:id", validParam, readPost);
router.post("/", validPost, createPost);
router.put("/:id", validParam, validPost, updatePost);
router.delete("/:id", validParam, deletePost);

export default router;
