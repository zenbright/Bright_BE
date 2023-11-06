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
  // Convert binary to base 64
  // Convert the base64 to string (use toString())
  // return that imagePath string
}
