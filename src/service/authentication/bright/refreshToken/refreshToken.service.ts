import userCredentials from "../../../../models/userCredentialsModel";
import userInfo from "../../../../models/userInfoModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET  } from "../../../../config"
import jwt from "jsonwebtoken";

export async function RefreshToken(req: any, res: any, next: any) {
  try {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({
      message: RESPONSE_CODE.JWT_NOT_FOUND,
    });
    const refreshToken = cookies.jwt;

    // Find user credentials
    const userCred = await userCredentials.findOne({ refreshToken }).exec();

    if (userCred) {
      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err || userCred.account !== decoded.account) return res.status(403).json({ message: "Invalid or expired refresh token or mismatched account" });
            const accessToken = jwt.sign(
                {
                    "account": userCred?.account,
                    "role": userCred?.role
                },
                ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            const roles = userCred?.role;
            res.json({ roles, accessToken });
        }
      )
    } else {
      res.status(404).json({
        message: RESPONSE_CODE.NOT_FOUND_ERROR,
      });
    }
  } catch (error) {
    next(error);
  }
}
