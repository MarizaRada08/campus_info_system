import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();

router.post("/register", AuthController.register);
router.post("/resend-otp", AuthController.resendOTP);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);

export default router;
