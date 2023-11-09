import userCredentials from "../../../models/userCredentials";
import userInformation from "../../../models/userInfo";

export async function searchUserService(req: any, res: any, next: any) {
  try {
    const { account, provider, fullname } = req.body;

    const userCred = await userCredentials.findOne({
      account: account,
      provider: provider
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
          return res.json(userData);
        } else {
          res.status(400).json({
            message: "Invalid User Fullname.",
          });
        }
      } else {
        res.status(404).json({
          message: "User Information not found.",
        });
      }
    } else {
      res.status(404).json({
        message: "User credentials not found.",
      });
    }
  } catch (error) {
    next(error);
  }
}
