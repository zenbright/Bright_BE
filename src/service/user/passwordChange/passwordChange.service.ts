import userCredentials from "../../../models/userCredentials";
import { ERROR_CODE, PROVIDER, SUCCESS_MESSAGE } from "../../utils/constants";
import { passwordValidator } from "../../utils/validator";

export async function passwordChangeService(req: any, res: any, next: any) {
  try {
    const { account, newPassword } = req.body;

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: account,
      provider: PROVIDER.BRIGHT
    });

    if (!userCred) {
      return res.status(404).json({ error: ERROR_CODE.USER_NOT_FOUND });
    } else {
      if (!passwordValidator(newPassword)) {
        return res.status(404).json({ error: ERROR_CODE.NOT_ALLOWED });
      }

      userCred.password = newPassword;
      await userCred.save();

      return res.status(200).json({ message: SUCCESS_MESSAGE });
    }
  } catch (error) {
    next(error);
  }
}
