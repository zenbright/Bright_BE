import axios from "axios";
import userInfo from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../config";

export async function emailVerificationService(req: any, res: any, next: any) {
  try {
    const { email } = req.body;
    console.log(email);
    // console.log("req.query.code: " + req.query.code);

    // Exchange authorization code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        // code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: "http://127.0.0.1:4000/auth/google/redirect",
      },
    );
    // Make a request to Google API to verify the email
    const accessToken = tokenResponse.data.access_token;
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/${email}/profile`,
      {
        // Add authentication headers or parameters here
        headers: {
          Authorization: `Bearer ${accessToken}`, // Replace with your actual access token
        },
      },
    );

    console.log(response.data);
    if (response.data.body.emailAddress) {
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
