import userInformation from "../../../../../models/userInfo";
import fs from "fs"; // node.js environment

export async function saveImageService(req: any, res: any, next: any) {
  try {
    const { userInfoId } = req.body;
    const filePath = req.file.path; // Multer has saved the file to disk
    const base64Image = convertImageToBinary(filePath);

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

function convertImageToBinary(filePath: string) {
  // Read the image file
  const binaryData = fs.readFileSync(filePath, { encoding: "base64" });
  // const base64String = binaryData.toString('base64'); // base64 string
  console.log(binaryData.toString());
  return binaryData.toString();
}
