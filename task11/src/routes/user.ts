import { Router } from "express";
import { upload } from "../utils/multer";
import { auth, nonAuth } from "../middlewares/auth";
import { existingUser } from "../middlewares/existing";
import { isFileErr, isFile, saveFile } from "../middlewares/file";
import { validateUser } from "../middlewares/validate";
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
router.post(
  "/register",
  nonAuth,
  upload.single("profile"),
  isFileErr,
  isFile,
  saveFile,
  validateUser,
  createUser
);
router.get("/user", auth, readUsers);
router.get("/user/:id", auth, readUser);
router.put(
  "/user/:id",
  auth,
  existingUser,
  upload.single("profile"),
  isFileErr,
  saveFile,
  validateUser,
  updateUser
);
router.delete("/user/:id", auth, existingUser, deleteUser);

export default router;
