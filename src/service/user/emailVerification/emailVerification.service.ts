import { validate } from "deep-email-validator";
import userInfo from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";
import { AUTH_EMAIL } from "../../../config";

export async function emailVerificationService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;

    let response = await validate({
      email: email,
      sender: AUTH_EMAIL,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: true,
    });

    console.log(response.valid);
    if (response.valid) {
      // If email is valid, update the user's isVerified field
      const user = await userInfo.findOne({ "email.address": email });
      if (user) {
        if (user.email) {
          user.email.isVerified = true;
          await user.save();
          return res.status(200).json({ message: SUCCESS_MESSAGE });
        }
      } else {
        return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
      }
    }
    return res
      .status(400)
      .json({ error: ERROR_CODE.INVALID + "_EMAIL_ADDRESS" });
  } catch (error) {
    next(error);
  }
}
