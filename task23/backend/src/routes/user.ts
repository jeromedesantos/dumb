import { Router } from "express";
import { auth, nonAuth, isSame, isExist } from "../middlewares/auth";
import { upload } from "../utils/multer";
import { validate } from "../middlewares/validate";
import { saveFile } from "../middlewares/file";
import { userSchema } from "../utils/joi";
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/logout", auth, logoutUser);
router.post(
  "/register",
  nonAuth,
  upload.single("photo_profile"),
  validate(userSchema),
  saveFile,
  registerUser
);
router.get("/verify", auth, verifyUser);
router.get("/user", auth, getUsers);
router.get("/user/:id", auth, isSame, getUserById);
router.put(
  "/user/:id",
  auth,
  isSame,
  isExist("user"),
  upload.single("profile"),
  saveFile,
  updateUser
);
router.delete("/user/:id", auth, isSame, deleteUser);

export default router;
