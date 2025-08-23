import express from "express";
import {
  readUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { validParam, validUser } from "../middlewares/validator";

const router = express.Router();

router.get("/", readUsers);
router.get("/:id", validParam, readUser);
router.post("/", validUser, createUser);
router.put("/:id", validParam, validUser, updateUser);
router.delete("/:id", validParam, deleteUser);

export default router;
