import userCredentials from "../../../models/userCredentials";
import userInformation from "../../../models/userInfo";

export async function deleteAccountService(req: any, res: any, next: any) {
  try {
    const { account, password } = req.body;

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: account,
      password: password,
      provider: 'bright'
    });

    if (!userCred) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      const userInfo = await userInformation.findOne({ _id: userCred.userId });

      if (userInfo) {
        // Delete both userCred and userInfo
        await userCredentials.deleteOne({ _id: userCred._id });
        await userInformation.deleteOne({ _id: userInfo._id });

        return res.status(200).json({
          message: "User account and associated info deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: "User Info not found.",
        });
      }
    }
  } catch (error) {
    next(error);
  }
}
