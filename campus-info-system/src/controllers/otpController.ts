import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// ✅ Store OTPs temporarily (Use Redis or a database in production)
const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {};

// ✅ Function to generate a random 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Nodemailer transporter setup using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // Set to true for SSL (port 465)
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ✅ Function to send OTP email
const sendMail = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `Bansud Institute <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  });
};

// ✅ Send OTP function
export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5-minute expiry

  try {
    await sendMail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

// ✅ Resend OTP function (fixes issue)
export const resendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const newOtp = generateOTP();
  otpStore[email] = { otp: newOtp, expiresAt: Date.now() + 5 * 60 * 1000 }; // Reset OTP

  try {
    await sendMail(email, newOtp);
    res.status(200).json({ message: "New OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to resend OTP", error });
  }
};
