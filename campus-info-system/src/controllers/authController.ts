import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel";
import { JWT_SECRET } from "../config/config";
import { validateUser } from "../validations/userValidation";
import { IUser } from "../interfaces/userInterface";
import mongoose from "mongoose";
import { generateOTP, sendOTP } from "../services/otpService";

class AuthController {
  // User Registration Handler
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Step 1: Validate user input
      const { error, value: payload } = validateUser(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((err) => err.message),
        });
        return; // Ensure execution stops here
      }

      const { email, password } = payload;

      // Step 2: Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return; // Ensure execution stops here
      }

      // Step 3: Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Step 4: Create new user data
      const userData: IUser = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
        password: hashedPassword,
        isVerified: false, // Mark the user as not verified
      };

      // Step 5: Save the user in the database
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      // Step 6: Generate OTP and send it via email
      const otp = generateOTP();
      otpStore[email] = otp;  // Store OTP temporarily (consider moving to a better persistent storage)

      const result = await sendOTP(email, otp);
      if (!result.success) {
        res.status(500).json({ message: "Error sending OTP" });
        return;
      }

      // Step 7: Respond with a message to verify the OTP
      res.status(201).json({
        message: "User registered successfully. Please verify your email with the OTP sent to your inbox.",
        user: {
          id: savedUser._id,
          email: savedUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error during registration", error });
    }
  }

  // User Login Handler
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Step 1: Verify if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Step 2: Verify if the user is verified via OTP
      if (!user.isVerified) {
        res.status(401).json({ message: "Email not verified. Please verify with the OTP sent to your inbox." });
        return;
      }

      // Step 3: Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid email or password" });
        return;
      }

      // Step 4: Generate access and refresh tokens
      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "10m",
      });
      const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      // Step 5: Send the response
      res.json({
        message: "Login successful",
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Error during login", error });
    }
  }

  // OTP Verification Handler
  async verifyOTPHandler(req: Request, res: Response): Promise<void> {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({ message: "Email and OTP are required" });
      return;
    }

    // Step 1: Check if OTP exists in the store
    const storedOtp = otpStore[email];
    if (!storedOtp) {
      res.status(400).json({ message: "OTP not found. Please request a new OTP." });
      return;
    }

    // Step 2: Validate OTP
    if (storedOtp === otp) {
      // OTP is valid, update user's verification status
      try {
        const user = await User.findOneAndUpdate(
          { email }, // Find user by email
          { isVerified: true }, // Set the user as verified
          { new: true } // Return the updated document
        );

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        console.log("User after update:", user); // Log user to check the `isVerified` status

        delete otpStore[email]; // OTP is used, remove it
        res.json({ message: "OTP verified successfully. You can now log in." });
      } catch (error) {
        res.status(500).json({ message: "Error updating user verification status", error });
      }
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  }

  // Resend OTP Handler
  async resendOTPHandler(req: Request, res: Response): Promise<void> {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "User is already verified" });
      return;
    }

    // Step 1: Generate a new OTP
    const otp = generateOTP();
    otpStore[email] = otp;

    // Step 2: Send OTP via email
    const result = await sendOTP(email, otp);
    if (!result.success) {
      res.status(500).json({ message: "Error sending OTP" });
      return;
    }

    // Step 3: Respond with a message to inform the user
    res.json({ message: "OTP resent successfully" });
  }
}

const otpStore: Record<string, string> = {}; // Temporary store for OTPs

export default new AuthController();
