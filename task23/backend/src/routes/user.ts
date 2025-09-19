import { Router } from "express";
import { auth, nonAuth, isSame, isExist } from "../middlewares/auth";
// import { upload } from "../utils/multer";
import { validate } from "../middlewares/validate";
// import { saveFile } from "../middlewares/file";
import { forgotSchema, registerSchema, resetSchema } from "../utils/joi";
import {
  loginUser,
  logoutUser,
  registerUser,
  resetUser,
  forgotUser,
  verifyUser,
  // getUsers,
  // getUserById,
  // updateUser,
  // deleteUser,
} from "../controllers/user";

const router = Router();

router.post("/login", nonAuth, loginUser);
router.post("/register", nonAuth, validate(registerSchema), registerUser);
router.post("/forgot", nonAuth, validate(forgotSchema), forgotUser);
router.post("/logout", auth, logoutUser);
router.put(
  "/reset/:id",
  nonAuth,
  isExist("user"),
  isSame,
  validate(resetSchema),
  resetUser
);
router.get("/verify", auth, verifyUser);

// router.get("/user", auth, getUsers);
// router.get("/user/:id", auth, isSame, getUserById);
// router.put(
//   "/user/:id",
//   auth,
//   isSame,
//   isExist("user"),
//   upload.single("profile"),
//   saveFile,
//   updateUser
// );
// router.delete("/user/:id", auth, isSame, deleteUser);

export default router;
