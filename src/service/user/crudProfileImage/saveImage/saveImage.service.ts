import userInformation from "../../../../models/userInfoModel";
import { RESPONSE_CODE, ALLOWED_FILE_EXTENSIONS } from "../../../utils/constants";
import path from "path";

export async function saveUserProfileImageService(req: any, res: any, next: any) {
  try {
    const { userId } = req.body;
    const { imageFile } = req.files;

    const userInfo = await userInformation.findOne({ _id: userId });

    if (!userInfo) {
      return res.status(404).json({ error: RESPONSE_CODE.NOT_FOUND_ERROR });
    }

    if (!imageFile) {
      return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
    }

    const uploadedFileExtension = path.extname(imageFile[0].originalname).toLowerCase();

    if (!ALLOWED_FILE_EXTENSIONS.IMAGE.includes(uploadedFileExtension)) {
      return res.status(400).json({ error: RESPONSE_CODE.NOT_ALLOWED });
    }

    userInfo.profileImage = imageFile[0].buffer;
    await userInfo.save();

    return res.status(200).json({ message: RESPONSE_CODE.SUCCESS });
  } catch (error) {
    next(error);
  }
}