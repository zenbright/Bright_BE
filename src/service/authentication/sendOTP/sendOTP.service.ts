import userInfo from "../../../models/userInfoModel";
import { RESPONSE_CODE } from "../../utils/constants";
import nodemailer from "nodemailer";
import OTPverification from "../../../models/OTPModel";
import { AUTH_EMAIL, AUTH_PASSWORD } from "../../../config";
import { OTP_EXPIRATION_INTERVAL } from "../../utils/constants";

export async function sendOTPService(req: any, res: any, next: any) {
  try {
    const { userId, email } = req.body;

    const user = await userInfo.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: RESPONSE_CODE.USER_NOT_FOUND });
    }

    if (!user.email?.isVerified) {
      return res.status(403).json({ error: RESPONSE_CODE.NOT_ALLOWED });
    }

    const OTP = await createOTP(generateOTP(), user.userCredentialId);

    const mailInfo = generateEmailContent(email, OTP);
    await sendOTP(mailInfo);

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export function generateOTP() {
  // a random 4-digit OTP
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export async function createOTP(OTP: string, userId: any) {
  // Delete existing OTP
  const existingOTP = await OTPverification.findOne({ userId: userId });

  if (existingOTP) {
    await OTPverification.findByIdAndDelete(existingOTP._id);
  }

  const newOTP= new OTPverification({
    userId: userId,
    OTP,
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRATION_INTERVAL * 60 * 1000,
  });

  await newOTP.save();

  return OTP;
}

export async function sendOTP(email: any) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });

  transporter.sendMail(email);
}

export function generateEmailContent(email: string, OTP: string) {
  const emailContent = `
    <p>Dear User,</p>

    <p>
      Please enter the following One-Time Password (OTP) in the application:
      <br>
      <strong>${OTP}</strong>
    </p>

    <p>
      Please be aware that this OTP is valid for ${OTP_EXPIRATION_INTERVAL} minute. After this period, you will need to request a new OTP.
    </p>

    <p>
      Thank you for choosing our service.
    </p>

    <p>Best regards,</p>
    <p>Bright</p>
  `;

  return {
    from: AUTH_EMAIL,
    to: email,
    subject: "Bright OTP Verification Code",
    html: emailContent,
  };
}
