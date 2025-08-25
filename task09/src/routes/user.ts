import { Router } from "express";
import { auth, nonAuth } from "../middlewares/auth";
import {
  loginUser,
  logoutUser,
  createUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/user";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/logout", auth, logoutUser);
router.post("/register", nonAuth, createUser);

router.get("/user", auth, readUsers);
router.get("/user/:id", auth, readUser);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

export default router;
