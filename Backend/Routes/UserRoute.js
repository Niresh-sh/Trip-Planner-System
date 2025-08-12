import { RegisterController, LoginController, LogoutController, GetAllUserController, GoogleLoginController } from '../Controller/UserController.js'
import express from 'express';
const router = express.Router();

router.post("/register", RegisterController);
router.post("/login",LoginController);
router.get("/allusers",GetAllUserController);
router.post("/logout",LogoutController);
router.post('/google-login', GoogleLoginController);




export default router;