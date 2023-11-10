import nodemailer from "nodemailer";
import userInfo from "../../../models/userInfo";

export async function resetPasswordService(req: any, res: any, next: any) {
  try {
    const { account } = req.body;
    
  } catch (error) {
    next(error);
  }
}
