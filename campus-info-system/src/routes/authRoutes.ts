import { Router } from "express";
import AuthController from "../controllers/authController";
import authController from "../controllers/authController";

const router = Router();

// User registration route
router.post("/register", AuthController.register);

// OTP verification route
router.post("/verify-otp", AuthController.verifyOTPHandler);

// User login route
router.post("/login", AuthController.login);

// Optionally, you can add the refresh token route
// router.post("/refresh-token", AuthController.refreshToken);

router.post("/resend-otp", authController.resendOTPHandler);


export default router;
