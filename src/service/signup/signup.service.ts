import mongoose from "mongoose";
import userCredentials from "../../models/userCredentials";
import userInfo from "../../models/userInfo";
import * as Formatter from "../utils/formatter";

export async function signupService(req: any, res: any) {
  try {
    const userData = req.body;

    console.log("Received userData:", userData);

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
      // social: {
      //   github: userData.html_url,
      // },
      // profileImage: await Formatter.imageToBase64FromURL(userData.avatar_url),
      userCredentialId: new mongoose.Types.ObjectId(),
    });

    // Create new credential
    const newCredential = new userCredentials({
      account: userData.email,
      password: userData.password,
      userId: newUserInfo._id,
      provider: "this",
    });

    await Promise.all([newUserInfo.save(), newCredential.save()]);
    return res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
