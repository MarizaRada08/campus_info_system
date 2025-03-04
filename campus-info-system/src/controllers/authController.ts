import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { User } from "../models/userModel";
import { JWT_SECRET } from "../config/config";
import { validateUser } from "../validations/userValidation";
import { IUser } from "../interfaces/userInterface";
import mongoose from "mongoose";

dotenv.config();

// ✅ Store OTPs temporarily (Use Redis or DB in production)
const otpStore: { [key: string]: string } = {};

// ✅ Generate a 6-digit OTP
const generateOTP = (): string => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

class AuthController {
  // ✅ Register User and Send OTP
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateUser(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }

      const { email, password } = payload;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData: IUser = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
        password: hashedPassword,
        verified: false,
      };

      const newUser = new User(userData);
      await newUser.save();

      // Generate and send OTP
      const otp = generateOTP();
      otpStore[email] = otp;

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: "Verify Your Email - OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      });

      res.status(201).json({ message: "User registered. OTP sent to email for verification." });
    } catch (error) {
      res.status(500).json({ message: "Error during registration", error });
    }
  }

  // ✅ Resend OTP
  async resendOTP(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const otp = generateOTP();
    otpStore[email] = otp;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Resend OTP Code",
      text: `Your new OTP code is ${otp}. It will expire in 5 minutes.`,
    });

    res.status(200).json({ message: "New OTP sent successfully." });
  }

  // ✅ Verify Email (via OTP)
  async verifyOTP(req: Request, res: Response) {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    if (otpStore[email] !== otp) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    await User.updateOne({ email }, { verified: true });
    delete otpStore[email];

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  }

  // ✅ Login User (Checks Email Verification)
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      if (!user.verified) {
        res.status(400).json({ message: "Email not verified. Please verify your OTP first." });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "10m" });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

      res.json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: { id: user._id, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }

  // ✅ Refresh Token
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(401).json({ message: "Refresh token is required" });
        return;
      }

      const decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "5m" });
      const newRefreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "24h" });

      res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Refresh token expired" });
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }
      res.status(500).json({ message: "Error during token refresh", error });
    }
  }
}

export default new AuthController();
