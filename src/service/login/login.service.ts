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
    console.log("Before finding userCredentials");
    const userCred = await userCredentials.findOne({ account: userData.login });
    console.log("After finding userCredentials");

    if (userCred) {
      console.log("User credentials found. Before finding userInfo.");
      const userDataMongo = await userInfo.findOne({ _id: userCred.userId });
      console.log("After finding userInfo");
      // TODO: compare email / password
      return res.json(userDataMongo);
    } else {
      console.log("User credentials not found.");
      res.status(404).json({
        message: "User does not exist..!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
