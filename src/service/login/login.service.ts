import userCredentials from "../../models/userCredentials";
import userInfo from "../../models/userInfo";

export async function loginService(req: any, res: any) {
  try {
    const userData = req.body;

    console.log("Received userData:", userData);

    if (!userData) {
      return res.status(400).json({ error: "Invalid Access Token!" });
    }

    // Check if user already exists in the database
    const userCred = await userCredentials.findOne({
      account: userData.account,
    });

    if (userCred) {
      // User credentials found. Now find userInfo.
      const userDataMongo = await userInfo.findOne({ _id: userCred.userId });

      if (userDataMongo) {
        // User account found, return user data.
        return res.json(userDataMongo);
      } else {
        // User data not found, handle the error.
        res.status(404).json({
          message: "User data not found.",
        });
      }
    } else {
      // User credentials not found.
      res.status(404).json({
        message: "User credentials not found.",
      });
    }
  } catch (error) {
    // Handle any errors that may occur during the database query or fetch request.
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
