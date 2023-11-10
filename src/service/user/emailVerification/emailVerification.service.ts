import axios from "axios";
import userInfo from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

let GOOGLE_API_KEY = "12345678"; // TODO: change it to the real API key

export async function emailVerificationService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;
    // Make a request to Google API to verify the email
    const response = await axios.get(
      `https://emailverificationapi.com/api/verify?email=${email}&key=${GOOGLE_API_KEY}`,
    );

    if (response.data.valid) {
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
