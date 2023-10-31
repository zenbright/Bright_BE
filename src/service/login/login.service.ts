import userCredentials from "../../models/userCredentials";
import userInfo from "../../models/userInfo";

export async function loginService(req: any, res: any) {
  try {
    const userData = req.body;

    if (!userData) {
      return res.status(400).json({ error: "Invalid Access Token!" });
    }

    // Check if user already exists in the database
    const userCred = await userCredentials.findOne({
      account: userData.account,
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
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
