import userCredentials from "src/models/userCredentials";
import userInformation from "src/models/userInfo";

export async function deleteAccountService(req: any, res: any) {
  try {
    const userData = req.body;

    console.log("userData: " + userData);

    if (!userData) {
      return res.status(400).json({ error: "Invalid or missing data." });
    }

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: userData.account,
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
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
