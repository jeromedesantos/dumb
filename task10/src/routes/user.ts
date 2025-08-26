import { Router } from "express";
import { auth, nonAuth } from "../middlewares/auth";
import { validateFile, validateUser } from "../middlewares/validate";
import {
  loginUser,
  logoutUser,
  createUser,
  readUsers,
  readUser,
  updateUser,
  deleteUser,
} from "../controllers/user";
import { upload } from "../utils/multer";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/logout", auth, logoutUser);
router.post(
  "/register",
  nonAuth,
  upload.single("profile"),
  validateFile,
  validateUser,
  createUser
);

router.get("/user", auth, readUsers);
router.get("/user/:id", auth, readUser);
router.put(
  "/user/:id",
  auth,
  upload.single("profile"),
  validateFile,
  validateUser,
  updateUser
);
router.delete("/user/:id", auth, deleteUser);

export default router;
