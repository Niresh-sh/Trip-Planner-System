import {
  RegisterController,
  LoginController,
  LogoutController,
  GetAllUserController,
  GoogleLoginController,
  UpdatePasswordController,
  UpdateProfileController,
  deleteUser,
} from "../Controller/UserController.js";
import express from "express";
import verifyToken from "../Middleware/VerifyToken.js";
import checkAdminModels from "../Middleware/AuthMiddleware.js";
const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/allusers", verifyToken, checkAdminModels, GetAllUserController);
router.post("/logout", LogoutController);
router.post("/google-login", GoogleLoginController);
router.put("/change-password", verifyToken, UpdatePasswordController);
router.put("/change-profile", UpdateProfileController);
router.delete("/deleteuser/:id", verifyToken, checkAdminModels, deleteUser);

export default router;
