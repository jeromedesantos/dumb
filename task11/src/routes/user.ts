import { Router, Request, Response, NextFunction } from "express";
import { upload } from "../utils/multer";
import { auth, nonAuth } from "../middlewares/auth";
import { isUserDeleted, isUserExist } from "../middlewares/existing";
import { isFile, saveFileUser } from "../middlewares/file";
import { validateUser } from "../middlewares/validate";
import {
  loginUser,
  logoutUser,
  createUser,
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
  isFile,
  saveFileUser,
  validateUser,
  createUser
);
router.get("/user", auth, readUsers);
router.get("/user/:id", auth, readUser);
router.put(
  "/user/:id",
  auth,
  isUserDeleted,
  upload.single("profile"),
  saveFileUser,
  validateUser,
  updateUser
);
router.patch("/user/:id", auth, isUserExist, restoreUser);
router.delete("/user/:id", auth, isUserDeleted, deleteUser);

export default router;
