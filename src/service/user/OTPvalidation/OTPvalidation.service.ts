import nodemailer from "nodemailer";
import userInfo from "../../../models/userInfo";
import { AUTH_EMAIL } from "../../../config";

export async function OTPvaldiationService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;

    const user = await userInfo.findOne({ "email.address": email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      if (user.email?.isVerified) {
        // Send OTP to the user's email
        const OTP = generateOTP();
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
  // Generate a random 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOTPByEmail(email: string, OTP: string) {
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Validation Code",
    text: `Your OTP code is: ${OTP}`,
  };

  await transporter.sendMail(mailOptions);
}

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: "BrightPassword", // TODO: Bright official email's password address
  },
});
