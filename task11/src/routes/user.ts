import { Router } from "express";
import { upload } from "../utils/multer";
import { userSchema } from "../utils/joi";
import { validate } from "../middlewares/validate";
import { auth, nonAuth, admin } from "../middlewares/auth";
import { isExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
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
  validate(userSchema),
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
  isExist("user"),
  upload.single("profile"),
  validate(userSchema),
  saveFile,
  updateUser
);
router.patch(
  "/user/:id/restore",
  auth,
  admin,
  isExist("user", false),
  restoreUser
);
router.delete("/user/:id", auth, isExist("user"), deleteUser);

export default router;
