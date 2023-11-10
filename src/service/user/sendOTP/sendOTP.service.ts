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
      res.status(404).json({ message: ERROR_CODE.USER_NOT_FOUND });
    } else {
      // if (user.email?.isVerified) {
      // Send OTP to the user's email
      const OTP = generateOTP();
      console.log("OTP generated");
      await saveOTPMemory(OTP, user.userCredentialId);
      console.log("OTP saved");
      await sendOTPtoUser(email, OTP);
      console.log("OTP sent");
      return res.status(200).json({ message: SUCCESS_MESSAGE });
      // } else {
      //   return res.status(403).json({ error: "USER_NOT_VERIFIED" });
      // }
    }
  } catch (error) {
    next(error);
  }
}

function generateOTP() {
  // a random 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function saveOTPMemory(OTP: string, userId: any) {
  const existingOTP = await OTPverification.findOne({ userId: userId });

  if (existingOTP) {
    // Handle the case where an OTP already exists for the user
    console.log("User already has an OTP.");
    await OTPverification.findByIdAndDelete(existingOTP._id);
    console.log("Previous OTP deleted.");
  }
  const expirationTimeInMinutes = 15; // OTP expires in 15 minutes
  const expirationTimeInMilliseconds = expirationTimeInMinutes * 60 * 1000;

  const newOTPverification = new OTPverification({
    userId: userId,
    OTP: OTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + expirationTimeInMilliseconds,
  });

  try {
    await newOTPverification.save();
    console.log(SUCCESS_MESSAGE);
  } catch (error) {
    console.error(error);
  }
}

async function sendOTPtoUser(email: string, OTP: string) {
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Verification Code",
    html: `<p>Enter <b>${OTP}</b> in the app to verify your email</p><p>This code <b>expires in 15 minutes.</b></p>`,
  };

  await transporter.sendMail(mailOptions);
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
  tls: {
    // This is important for avoiding self-signed certificate errors
    rejectUnauthorized: false,
  },
});
