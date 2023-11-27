import { validate } from "deep-email-validator";
import userInfo from "../../../models/userInfoModel";
import { RESPONSE_CODE } from "../../utils/constants";
import { AUTH_EMAIL } from "../../../config";

export async function emailVerificationService(req: any, res: any, next: any) {
  try {
    const { userId, email } = req.body;

    let response = await validate({
      email: email,
      sender: AUTH_EMAIL,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: true,
    });

    if (!response.valid) {
      return res.status(400).json({ error: RESPONSE_CODE.INVALID_VALUE });
    }

    const updatedUser = await userInfo.findOneAndUpdate(
      { _id: userId, "email": email },
      { $set: { "email.isVerified": true } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: RESPONSE_CODE.USER_NOT_FOUND });
    }

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}