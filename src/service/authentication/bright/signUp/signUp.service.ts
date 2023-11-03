import mongoose from "mongoose";
import userCredentials from "../../../../models/userCredentials";
import userInfo from "../../../../models/userInfo";

export async function signUpBrigthAccount(req: any, res: any, next: any) {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(400).json({ error: "Invalid User Data!" });
    } else {
      const existingUser = await userCredentials.findOne({
        account: userData.account,
        provider: 'bright'
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
    }

    // Create new credential
    const newCredential = new userCredentials({
      account: userData.account,
      password: userData.password,
      userId: new mongoose.Types.ObjectId(),
      provider: 'bright',
    });

    // Create new user information
    const newUserInfo = new userInfo({
      fullname: userData.fullname || userData.account,
      dateOfBirth: userData.dateOfBirth || new Date(),
      email: {
        address: userData.email || '',
        isVerified: false,
      },
      gender: userData.gender || '',
      address: userData.address || '',
      social: {},
      profileImage: '',
      userCredentialId: newCredential._id,
    });

    newCredential.userId = newUserInfo._id;

    await Promise.all([newUserInfo.save(), newCredential.save()]);
    return res.status(200).json({ message: "Create new user successfully" });
  } catch (error) {
    next(error);
  }
}
