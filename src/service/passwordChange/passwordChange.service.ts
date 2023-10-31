import userCredentials from "../../models/userCredentials";

export async function passwordChangeService(req: any, res: any) {
  try {
    const newCredentialData = req.body;

    if (!newCredentialData) {
      return res.status(400).json({ error: "Invalid Access Token!" });
    }

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: newCredentialData.account,
    });

    if (!userCred) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      // TODO: (Optional) Password regex
      // Create new credential with the new password
      const newCredential = new userCredentials({
        account: newCredentialData.account,
        password: newCredentialData.newPassword,
        userId: userCred.userId,
        provider: userCred.provider,
      });

      await newCredential.save();
      return res
        .status(200)
        .json({ message: "New account data saved successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
