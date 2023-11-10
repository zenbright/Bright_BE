import nodemailer from "nodemailer";
import userInfo from "../../../models/userInfo";
import OTPverification from "src/models/OTPverification";
import { AUTH_EMAIL } from "../../../config";

export async function sendOTPService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;

    const user = await userInfo.findOne({ "email.address": email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      if (user.email?.isVerified) {
        // Send OTP to the user's email
        const OTP = generateOTP();
        await saveOTPMemory(OTP, user._id);
        await sendOTPByEmail(email, OTP);
        return res.status(200).json({ message: "OTP sent to your email" });
      } else {
        return res.status(403).json({ error: "User not verified" });
      }
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
  const newOTPverification = new OTPverification({
    userId: userId,
    OTP: OTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + 900000, // expires in 15 minutes
  });

  try {
    await newOTPverification.save();
    console.log("OTP saved successfully");
  } catch (error) {
    console.error("Error saving OTP:", error);
  }
}

async function sendOTPByEmail(email: string, OTP: string) {
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Validation Code",
    html: `<p>Enter <b>${OTP}</b> in the app to verify your email</p><p>This code <b>expires in 15 minutes.</b></p>`,
  };

  await transporter.sendMail(mailOptions);
}

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: "BrightPassword", // TODO: Bright official email's password
  },
});
