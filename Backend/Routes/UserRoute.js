import { RegisterController, LoginController, LogoutController, GetAllUserController } from '../Controller/UserController.js'
import express from 'express';
const router = express.Router();

router.post("/register", RegisterController);
router.post("/login",LoginController);
router.get("/allusers",GetAllUserController);
router.post("/logout",LogoutController);




export default router;