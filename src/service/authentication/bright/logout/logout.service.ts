import userCredentials from "../../../../models/userCredentials";
import { ERROR_CODE } from "../../../utils/constants";
import jwt from "jsonwebtoken";

export async function logoutwithBright(req: any, res: any, next: any) {
  try {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const userCred = await userCredentials.findOne({ refreshToken }).exec();
    if (!userCred) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      return res.sendStatus(204).json("Cookie clear");
    }
    
    // Delete refreshToken in db
    userCred.refreshToken = '';
    const result = await userCred.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204).json("SUCCESS LOGOUT");

  } catch (error) {
    next(error);
  }
}
