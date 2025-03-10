import express from "express";
import { sendOTP, resendOTP } from "../controllers/otpController";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/resend-otp", resendOTP); // ✅ Added route for resending OTP

export default router;
