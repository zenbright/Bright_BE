import userCredentials from "../../../models/userCredentials";
import userInformation from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function deleteAccountService(req: any, res: any, next: any) {
  try {
    const { account, provider } = req.body;

    const userCred = await userCredentials.findOne({
      account: account,
      provider: provider,
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    } else {
      const userInfo = await userInformation.findOne({ _id: userCred.userId });

      if (userInfo) {
        // Delete both userCred and userInfo
        await userCredentials.deleteOne({ _id: userCred._id });
        await userInformation.deleteOne({ _id: userInfo._id });

        return res.status(200).json({
          message: SUCCESS_MESSAGE,
        });
      } else {
        res.status(404).json({
          message: ERROR_CODE.USER_NOT_FOUND,
        });
      }
    }
  } catch (error) {
    next(error);
  }
}
