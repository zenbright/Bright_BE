import userCredentials from "../../../models/userCredentials";
import OTPverification from "../../../models/OTPverification";
import { ERROR_CODE, SUCCESS_MESSAGE, PROVIDER } from "../../utils/constants";

export async function verifyOTPService(req: any, res: any, next: any) {
  try {
    const { account, userTypedOTP } = req.body;

    const userCred = await userCredentials.findOne({
      account: account,
      provider: PROVIDER.BRIGHT,
    });

    if (userCred) {
      const OTP = await OTPverification.findOne({ userId: userCred._id });
      if (OTP) {
        if (isExpired(OTP)) {
          await OTPverification.findByIdAndDelete(OTP._id);
          return res.status(400).json({ error: "OTP_EXPIRED" });
        } else {
          if (OTP.OTP == userTypedOTP) {
            // when OTP is matched
            await OTPverification.findByIdAndDelete(OTP._id);
            return res.status(200).json({ message: SUCCESS_MESSAGE });
          } else {
            return res.status(400).json({ error: ERROR_CODE.INVALID + "_OTP" });
          }
        }
      } else {
        res.status(404).json({
          message: "OTP_" + ERROR_CODE.NOT_FOUND_ERROR,
        });
      }
    } else {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
}

function isExpired(OTP: any) {
  const currentTime = Date.now();
  if (currentTime > OTP.expiresAt.getTime()) {
    return true;
  }
  return false;
}
