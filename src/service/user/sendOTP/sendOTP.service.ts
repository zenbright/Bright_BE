import userInfo from "../../../models/userInfo";
import * as SendOTPfunction from "./sendOTP.function";
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

    const OTP = SendOTPfunction.generateOTP();
    await SendOTPfunction.saveOTPMemory(OTP, user.userCredentialId);

    const mailInfo = SendOTPfunction.generateEmailContent(email, OTP);
    await SendOTPfunction.sendOTPtoUser(mailInfo);

    return res.status(200).json({ message: SUCCESS_MESSAGE });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
