import mongoose from "mongoose";
import userCredentials from "../../models/userCredentials";
import userInfo from "../../models/userInfo";
// import * as Formatter from "../utils/formatter";

export async function signupService(req: any, res: any) {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(400).json({ error: "Invalid Access Token!" }); 
    } else {
      const existingUser = await userCredentials.findOne({
        account: userData.fullname,
      });

      if (existingUser && existingUser.password === userData.password) {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    // TODO: (Optional) Password regex

    // Create new credential
    const newCredential = new userCredentials({
      account: userData.account,
      password: userData.password,
      userId: new mongoose.Types.ObjectId(),
      provider: "this",
    });

    // Create new user information
    const newUserInfo = new userInfo({
      fullname: userData.fullname,
      dateOfBirth: userData.dateOfBirth,
      email: {
        address: userData.email,
        // isVerified: userData.email ? true : false,
      },
      gender: userData.gender,
      address: userData.address,
      social: userData.social,
      // profileImage: await Formatter.imageToBase64FromURL(userData.avatar_url),
      userCredentialId: newCredential._id,
    });

    await Promise.all([newUserInfo.save(), newCredential.save()]);
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
