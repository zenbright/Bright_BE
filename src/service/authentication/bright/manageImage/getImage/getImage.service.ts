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
      // Instead of returning the file path, return the binary data
      const binary = userInfo.profileImage;
      const image = convertBinaryToImage(binary, "profile.png");

      console.log("image type:", typeof image); // Buffer (Object)
      return res.status(200).json({
        image: image,
        message: "Got the profile image successfully",
      });
    }
  } catch (error) {
    next(error);
  }
}

function convertBinaryToImage(
  binaryData: string | undefined,
  filePath: string,
) {
  if (!binaryData) {
    console.log("Binary data is missing.");
    return null;
  }
  // Convert base64 to buffer
  const buffer = Buffer.from(binaryData, "base64");

  return buffer;
}
