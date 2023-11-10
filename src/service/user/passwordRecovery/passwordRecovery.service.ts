import nodemailer from "nodemailer";
import userInfo from "../../../models/userInfo";

export async function OTPvaldiationService(req: any, res: any, next: any) {
  try {
    const { account, OTP } = req.body;

    // if the OTP match, then simply return a success status (200)
    
  } catch (error) {
    next(error);
  }
}
