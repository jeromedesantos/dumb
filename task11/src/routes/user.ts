import { Router, Request, Response, NextFunction } from "express";
import { upload } from "../utils/multer";
import { auth, nonAuth, admin } from "../middlewares/auth";
import { isModelExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
import { validateUser } from "../middlewares/validate";
import {
  loginUser,
  logoutUser,
  createUser,
  readUsersSummary,
  readUsers,
  readUser,
  updateUser,
  restoreUser,
  deleteUser,
} from "../controllers/user";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/logout", auth, logoutUser);
router.post(
  "/register",
  nonAuth,
  upload.single("profile"),
  validateUser,
  isFile,
  saveFile,
  createUser
);
router.get("/user/summary", auth, admin, readUsersSummary);
router.get("/user", auth, admin, readUsers);
router.get("/user/:id", auth, readUser);
router.put(
  "/user/:id",
  auth,
  isModelExist("user"),
  upload.single("profile"),
  validateUser,
  saveFile,
  updateUser
);
router.patch(
  "/user/:id/restore",
  auth,
  admin,
  isModelExist("user", false),
  restoreUser
);
router.delete("/user/:id", auth, isModelExist("user"), deleteUser);

export default router;
