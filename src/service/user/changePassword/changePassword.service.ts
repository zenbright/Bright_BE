import userCredentials from "../../../models/userCredentialsModel";
import { RESPONSE_CODE, PROVIDER } from "../../utils/constants";
import { passwordValidator } from "../../utils/validator";

export async function changePasswordService(req: any, res: any, next: any) {
  try {
    const { account, newPassword } = req.body;

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: account,
      provider: PROVIDER.BRIGHT
    });

    if (!userCred) {
      return res.status(404).json({ error: RESPONSE_CODE.USER_NOT_FOUND });
    } else {
      if (!passwordValidator(newPassword)) {
        return res.status(404).json({ error: RESPONSE_CODE.NOT_ALLOWED });
      }

      userCred.password = newPassword;
      await userCred.save();

      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    }
  } catch (error) {
    next(error);
  }
}
