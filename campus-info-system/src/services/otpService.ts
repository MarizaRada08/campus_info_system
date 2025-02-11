import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// OAuth2 setup
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token as string,
    },
  });
}

// Generate OTP
export function generateOTP(): string {
  return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
}

// Send OTP via email
export async function sendOTP(email: string, otp: string) {
  const transporter = await createTransporter();

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send OTP", error };
  }
}
