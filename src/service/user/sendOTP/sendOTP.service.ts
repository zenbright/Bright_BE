import nodemailer from "nodemailer";
import userInfo from "../../../models/userInfo";
import OTPverification from "../../../models/OTPverification";
import { AUTH_EMAIL, AUTH_PASSWORD } from "../../../config";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function sendOTPService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;

    const user = await userInfo.findOne({ "email.address": email });

    if (!user) {
      return res.status(404).json({ message: ERROR_CODE.USER_NOT_FOUND });
    }

    if (!user.email?.isVerified) {
      return res.status(403).json({ error: "USER_NOT_VERIFIED" });
    }

    const OTP = generateOTP();
    await saveOTPMemory(OTP, user.userCredentialId);

    const mailInfo = generateEmailContent(email, OTP);
    await sendOTPtoUser(mailInfo);

    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

function generateOTP() {
  // a random 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function saveOTPMemory(OTP: string, userId: any) {
  await handleExistingOTP(userId);
  const expirationTimeInMinutes = 15; // OTP expires in 15 minutes
  const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;

  const newOTPverification = new OTPverification({
    userId: userId,
    OTP: OTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + expirationTimeInMilliseconds,
  });

  await newOTPverification.save();
}

async function handleExistingOTP(userId: any) {
  const existingOTP = await OTPverification.findOne({ userId: userId });
  if (existingOTP) {
    await OTPverification.findByIdAndDelete(existingOTP._id);
  }
}

async function sendOTPtoUser(mailInfo: any) {
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

function generateEmailContent(email: string, OTP: string) {
  return {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Verification Code",
    html: `<p>Enter <b>${OTP}</b> in the app to verify your email</p><p>This code <b>expires in 15 minutes.</b></p>`,
  };
}
