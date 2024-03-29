import mongoose from "mongoose";
import userCredentials from "../../../../models/userCredentialsModel";
import userInfo from "../../../../models/userInfoModel";
import { RESPONSE_CODE, PROVIDER } from "../../../utils/constants";
import { passwordValidator } from "../../../utils/validator";
import bcrypt from "bcryptjs";

export async function signUpBrigthAccount(req: any, res: any, next: any) {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    } else {
      const existingUser = await userCredentials.findOne({
        account: userData.account,
        provider: PROVIDER.BRIGHT
      });

      // User already exists
      if (existingUser) {
        return res.status(400).json({ message: RESPONSE_CODE.NOT_ALLOWED });
      }

      if (!passwordValidator(userData.password)) {
        return res.status(400).json({ message: RESPONSE_CODE.NOT_ALLOWED });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    // Create new credential
    const newCredential = new userCredentials({
      account: userData.account,
      password: hashPassword,
      userId: new mongoose.Types.ObjectId(),
      provider: PROVIDER.BRIGHT,
    });

    // Create new user information
    const newUserInfo = new userInfo({
      fullname: userData.fullname || userData.account,
      dayOfBirth: userData.dayOfBirth || new Date(),
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
    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}
