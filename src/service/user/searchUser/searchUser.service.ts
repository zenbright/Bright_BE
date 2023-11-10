import userCredentials from "../../../models/userCredentials";
import userInformation from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function searchUserService(req: any, res: any, next: any) {
  try {
    const { account, provider, fullname } = req.body;

    const userCred = await userCredentials.findOne({
      account: account,
      provider: provider,
    });

    if (userCred) {
      const userInfo = await userInformation.findOne({ _id: userCred.userId });

      if (userInfo) {
        if (userInfo.fullname == fullname) {
          //return both userInfo and userCred
          const userData = {
            userInfo: userInfo,
            userCred: userCred,
          };
          return res.status(200).json({ message: SUCCESS_MESSAGE, userData });
        } else {
          res.status(400).json({
            message: ERROR_CODE.INVALID + "_USER_FULLNAME",
          });
        }
      } else {
        return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
      }
    } else {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
}
