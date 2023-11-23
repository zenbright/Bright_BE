import userCredentials from "../../../../models/userCredentials";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../../utils/constants";
import jwt from "jsonwebtoken";

export async function logoutwithBright(req: any, res: any, next: any) {
  try {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({
      message: ERROR_CODE.JWT_NOT_FOUND,
    });
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const userCred = await userCredentials.findOne({ refreshToken }).exec();
    if (!userCred) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.status(200).json({ message: "COOKIES CLEAR" });
    }
    
    // Delete refreshToken in db
    userCred.refreshToken = '';
    const result = await userCred.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: SUCCESS_MESSAGE });

  } catch (error) {
    next(error);
  }
}
