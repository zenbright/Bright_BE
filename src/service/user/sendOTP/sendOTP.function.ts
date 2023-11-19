import nodemailer from "nodemailer";
import OTPverification from "../../../models/OTPverification";
import { AUTH_EMAIL, AUTH_PASSWORD } from "../../../config";

const expirationTimeInMinutes = 60; // OTP expires in 60 minutes

export function generateOTP() {
  // a random 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function saveOTPMemory(OTP: string, userId: any) {
  const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;

  const newOTPverification = new OTPverification({
    userId: userId,
    OTP: OTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + expirationTimeInMilliseconds,
  });
  await newOTPverification.save();
}

export async function handleExistingOTP(userId: any) {
  const existingOTP = await OTPverification.findOne({ userId: userId });
  if (existingOTP) {
    await OTPverification.findByIdAndDelete(existingOTP._id);
  }
}

export async function sendOTPtoUser(mailInfo: any) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });
  transporter.sendMail(mailInfo);
}

export function generateEmailContent(email: string, OTP: string) {
  return {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Verification Code",
    html: `<p>Enter <b>${OTP}</b> in the app to verify your email. This code <b>expires in ${expirationTimeInMinutes} minutes.</b></p>`,
  };
}
