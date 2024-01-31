import userCredentials from "../../../../models/userCredentialsModel";
import userInfo from "../../../../models/userInfoModel";
import { RESPONSE_CODE, PROVIDER } from "../../../utils/constants";

export async function loginWithBright(req: any, res: any, next: any) {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    // Find user credentials
    const userCred = await userCredentials.findOne({
      account: account,
      password: password,
      provider: PROVIDER.BRIGHT
    });

    if (userCred) {
      const userDataMongo = await userInfo.findOne({ _id: userCred.userId });

      if (userDataMongo) {
        return res.json(userDataMongo); // return user
      } else {
        res.status(400).json({
          message: RESPONSE_CODE.NOT_FOUND_ERROR,
        });
      }
    } else {
      res.status(400).json({
        message: RESPONSE_CODE.NOT_FOUND_ERROR,
      });
    }
  } catch (error) {
    next(error);
  }
}
