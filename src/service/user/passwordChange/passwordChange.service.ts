import userCredentials from "../../../models/userCredentials";

export async function passwordChangeService(req: any, res: any,  next: any) {
  try {
    const newCredentialData = req.body;

    console.log("newCredentialData: " + newCredentialData);

    if (!newCredentialData) {
      return res.status(400).json({ error: "Invalid or missing data." });
    }

    // Find the existing credential with account
    const userCred = await userCredentials.findOne({
      account: newCredentialData.account,
    });

    if (!userCred) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      console.log("found credential");
      // TODO: (Optional) Password regex
      // Update the password field of the existing credential
      userCred.password = newCredentialData.newPassword;

      await userCred.save();
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    next(error);
  }
}
