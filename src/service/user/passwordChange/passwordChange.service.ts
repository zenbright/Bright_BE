import userCredentials from "../../../models/userCredentials";
import {ERROR_CODE} from "../../utils/constants";

export async function passwordChangeService(req: any, res: any, next: any) {
  try {
    const { account, provider, newPassword } = req.body;

    // Only allow password change with bright accounts
    if (provider != 'bright') {
      return res.status(500).json({ error: ERROR_CODE.INSUFFICIENT_PERMISSION });
    }
    
    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: account,
      provider: provider
    });

    if (!userCred) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      // TODO: (Optional) Password regex
      // Update the password field of the existing credential
      userCred.password = newPassword;

      await userCred.save();
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    next(error);
  }
}
