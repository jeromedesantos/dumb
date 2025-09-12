import { Router } from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/user";
import { auth, nonAuth } from "../middlewares/auth";
import { upload } from "../utils/multer";
import { validate } from "../middlewares/validate";
import { isFile, saveFile } from "../middlewares/file";
import { userSchema } from "../utils/joi";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/logout", logoutUser);
router.post(
  "/register",
  nonAuth,
  upload.single("photo_profile"),
  validate(userSchema),
  isFile,
  saveFile,
  registerUser
);
router.get("/verify", auth, verifyUser);
router.get("/user", auth, getUsers);

export default router;
