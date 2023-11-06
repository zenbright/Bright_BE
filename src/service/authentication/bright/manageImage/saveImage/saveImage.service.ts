import userInformation from "../../../../../models/userInfo";
import fs from "fs";

export async function saveImageService(req: any, res: any, next: any) {
  try {
    const { imagePath, userInfoId } = req.body;
    const base64Image = convertImageToBinary(imagePath);

    // Find the existing account with id
    const userInfo = await userInformation.findOne({
      _id: userInfoId,
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      console.log("found Info");
      // Update the profileImage as base64 string
      userInfo.profileImage = base64Image;

      await userInfo.save();
      return res
        .status(200)
        .json({ message: "Profile Image updated successfully" });
    }
  } catch (error) {
    next(error);
  }
}

function convertImageToBinary(imagePath: any) {
  // Read the image file
  const imageBuffer = fs.readFileSync(imagePath);
  // Convert the image data to Base64 binary format
  const base64Image = imageBuffer.toString("base64");

  return base64Image;
}
