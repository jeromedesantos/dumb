import { Router } from "express";
import { upload } from "../utils/multer";
import { userSchema, transferSchema } from "../utils/joi";
import { validate } from "../middlewares/validate";
import { auth, nonAuth, isAdmin, isSame } from "../middlewares/auth";
import { isExist } from "../middlewares/existing";
import { isFile, saveFile } from "../middlewares/file";
import {
  loginUser,
  logoutUser,
  createUser,
  readUsersSummary,
  readUsers,
  readUser,
  transferPoint,
  updateUser,
  restoreUser,
  deleteUser,
  searchUsers,
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
router.post("/user/transfer-point", validate(transferSchema), transferPoint);
router.get("/user/summary", auth, isAdmin, readUsersSummary);
router.get("/user", auth, isAdmin, readUsers);
router.get("/user/search", auth, isAdmin, searchUsers);
router.get("/user/:id", auth, isSame, readUser);
router.put(
  "/user/:id",
  auth,
  isSame,
  isExist("user"),
  upload.single("profile"),
  validate(userSchema),
  saveFile,
  updateUser
);
router.patch(
  "/user/:id/restore",
  auth,
  isAdmin,
  isExist("user", true),
  restoreUser
);
router.delete("/user/:id", auth, isExist("user"), deleteUser);

export default router;
