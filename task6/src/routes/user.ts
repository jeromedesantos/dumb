import { Router } from "express";
import { validUser } from "../middlewares/validator";
import {
  readUsers,
  readUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

const router = Router();

router.get("/", readUsers);
router.get("/:id", readUser);
router.post("/", validUser, createUser);
router.put("/:id", validUser, updateUser);
router.delete("/:id", deleteUser);

export default router;
