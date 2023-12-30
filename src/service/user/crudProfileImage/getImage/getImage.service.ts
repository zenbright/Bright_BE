import userInformation from "../../../../models/userInfoModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function getUserProfileImageService(req: any, res: any, next: any) {
  try {
    const { userId } = req.body;

    const userInfo = await userInformation.findOne({ _id: userId });

    if (!userInfo) {
      return res.status(404).json({ error: RESPONSE_CODE.USER_NOT_FOUND });
    }

    const { profileImage } = userInfo;

    if (!profileImage) {
      return res.status(200).json({ image: "", message: RESPONSE_CODE.SUCCESS });
    }

    const imageInBase64 = profileImage.toString("base64");

    return res.status(200).json({
      image: imageInBase64,
      message: RESPONSE_CODE.SUCCESS,
    });
  } catch (error) {
    next(error);
  }
}
