import userCredentials from "../../../../models/userCredentials";
import userInfo from "../../../../models/userInfo";

export async function loginWithBright(req: any, res: any, next: any) {
  try {
    const { account, password } = req.body;

    if (!account || !password) {
      return res.status(400).json({ error: "Invalid User Credentials!" });
    }

    // Find user credentials
    const userCred = await userCredentials.findOne({
      account: account,
      password: password,
      provider: 'bright'
    });

    if (userCred) {
      const userDataMongo = await userInfo.findOne({ _id: userCred.userId });

      if (userDataMongo) {
        return res.json(userDataMongo); // return user
      } else {
        res.status(404).json({
          message: "User data not found.",
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
