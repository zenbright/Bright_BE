import mongoose from "mongoose";
import userCredentials from "../../models/userCredentials";
import userInfo from "../../models/userInfo";
import * as Formatter from "../utils/formatter";

export async function signupService(req: any, res: any) {
  try {
    const userData = req.body;

    // Create new user information
    const newUserInfo = new userInfo({
      fullname: userData.name,
      email: {
        address: userData.email,
        isVerified: userData.email ? true : false,
      },
      social: {
        github: userData.html_url,
      },
      profileImage: await Formatter.imageToBase64FromURL(userData.avatar_url),
      userCredentialId: new mongoose.Types.ObjectId(),
    });

    // Create new credential
    const newCredential = new userCredentials({
      account: userData.signup,
      password: userData.signup,
      userId: newUserInfo._id,
      provider: "this",
    });

    await Promise.all([newUserInfo.save(), newCredential.save()]);
    return res.json(newUserInfo, newCredential);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
