import userInfo from "../../../models/userInfo";
import userCredentials from "src/models/userCredentials";
import OTPverification from "src/models/OTPverification";

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
        if (OTP == userTypedOTP) {
          // TODO: if the OTP match, then simply call resetPassword service
          // TODO: handle expiration of OTP
        } else {
          return res.status(400).json({ error: "Invalid OTP!" });
        }
      } else {
        res.status(404).json({
          message: "OTP not found.",
        });
      }
    } else {
      res.status(404).json({
        message: "User credentials not found.",
      });
    }
  } catch (error) {
    next(error);
  }
}
