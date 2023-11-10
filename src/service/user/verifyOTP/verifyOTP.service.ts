import userCredentials from "src/models/userCredentials";
import OTPverification from "src/models/OTPverification";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function verifyOTPService(req: any, res: any, next: any) {
  try {
    const { account, userTypedOTP } = req.body;

    const userCred = await userCredentials.findOne({
      account: account,
      provider: "bright",
    });

    if (userCred) {
      const OTP = await OTPverification.findOne({ _id: userCred._id });
      if (OTP) {
        // handle expiration of OTP
        const currentDateTime = Date.now();
        if (currentDateTime > OTP.expiresAt.getTime()) {
          // delete the OTP object
          await OTPverification.findByIdAndDelete(userCred._id);
          return res.status(400).json({ error: "OTP_EXPIRED" });
        } else {
          if (OTP == userTypedOTP) {
            // when OTP is matched
            await OTPverification.findByIdAndDelete(userCred._id);
            return res.status(200).json({ message: SUCCESS_MESSAGE });
          } else {
            return res.status(400).json({ error: "INVALID_OTP" });
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
