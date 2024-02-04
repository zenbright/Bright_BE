import userCredentials from "../../../../models/userCredentialsModel";
import userInfo from "../../../../models/userInfoModel";
import { RESPONSE_CODE, PROVIDER } from "../../../utils/constants";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET  } from "../../../../config"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export async function loginWithBright(req: any, res: any, next: any) {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    // Find user credentials
    const userCred = await userCredentials.findOne({
      account: account,
      provider: PROVIDER.BRIGHT 
    });

    const matchPassword = await bcrypt.compare(password, String(userCred?.password));

    if (userCred && matchPassword) {
      const userDataMongo = await userInfo.findOne({ _id: userCred.userId });

      if (userDataMongo) {
        const accessToken = jwt.sign(
          {
              account: userCred?.account,
              role: userCred?.role
          },
          ACCESS_TOKEN_SECRET,
          { expiresIn: '30s'}
        );

        const refreshToken = jwt.sign(
          {
            account: userCred?.account,
          },
          REFRESH_TOKEN_SECRET,
          { expiresIn: '30d'}
        );
        userCred.refreshToken = refreshToken;
        const result = await userCred.save();
        console.log(result);

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json(accessToken);
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
