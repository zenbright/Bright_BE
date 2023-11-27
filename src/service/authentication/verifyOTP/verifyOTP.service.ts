import userCredentials from "../../../models/userCredentialsModel";
import OTPverification from "../../../models/OTPModel";
import { RESPONSE_CODE, PROVIDER } from "../../utils/constants";

export async function verifyOTPService(req: any, res: any, next: any) {
  try {
    const { userCredId, userTypedOTP } = req.body;

    const userCred = await userCredentials.findOne({ _id: userCredId });

    if (!userCred) {
      return res.status(404).json({ error: RESPONSE_CODE.USER_NOT_FOUND });
    }

    const OTP = await OTPverification.findOne({ userId: userCred._id });

    if (!OTP) {
      return res.status(404).json({
        error: RESPONSE_CODE.NOT_FOUND_ERROR,
        message: "OTP_" + RESPONSE_CODE.NOT_FOUND_ERROR,
      });
    }

    if (isExpired(OTP)) {
      await OTPverification.findByIdAndDelete(OTP._id);
      return res.status(400).json({ error: "OTP_EXPIRED" });
    } else {
      if (OTP.OTP == userTypedOTP) {
        // when OTP is matched
        await OTPverification.findByIdAndDelete(OTP._id);
        return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
      } else {
        return res.status(400).json({ error: RESPONSE_CODE.INVALID_VALUE + "_OTP" });
      }
    }
  } catch (error) {
    next(error);
  }
}

function isExpired(OTP: any) {
  return Date.now() > OTP.expiresAt.getTime();
}
