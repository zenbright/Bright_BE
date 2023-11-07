import fs from "fs";
import userInformation from "../../../../../models/userInfo";

export async function getImageService(req: any, res: any, next: any) {
  try {
    const { userInfoId } = req.body;
    // Find the existing account with id
    const userInfo = await userInformation.findOne({
      _id: userInfoId,
    });

    if (!userInfo) {
      return res.status(404).json({ error: "User account not found." });
    } else {
      console.log("found Info");
      // TODO: return it as a file
      const binary = userInfo.profileImage;
      const image = convertBinaryToImage(binary);

      return res.status(200).json({
        image: image,
        message: "Got the profile image successfully",
      });
    }
  } catch (error) {
    next(error);
  }
}

function convertBinaryToImage(binary: String | undefined) {
  if (!binary) {
    console.log("Binary data is missing.");
    return;
  }

  // Convert binary to base64
  const base64Data = Buffer.from(binary, "binary").toString("base64");

  // Specify the image file path
  const imagePath = "profile.jpg";

  // Save the base64 data as an image file
  fs.writeFile(imagePath, base64Data, { encoding: "base64" }, (error: any) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("File Created");
      return imagePath;
    }
  });
}
