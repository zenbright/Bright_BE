import userInformation from "../../../../../models/userInfo";
import fs from "fs";

export async function saveImageService(req: any, res: any, next: any) {
  try {
    const { imageFile, userInfoId } = req.body;
    const base64Image = convertImageToBinary(imageFile);

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

function convertImageToBinary(imageFile: any) {
  // Read the image file
  var reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onload = function () {
    //me.modelvalue = reader.result;
    console.log(reader.result);
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
  return "";

  //   const imageBuffer = fs.readFileSync(imagePath);
  // Convert the image data to Base64 binary format
  //   const base64Image = imageBuffer.toString("base64");
  //   return base64Image;
}
