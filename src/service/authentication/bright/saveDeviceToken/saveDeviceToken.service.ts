import userInfo from "../../../../models/userInfoModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function saveDeviceTokenService(req: any, res: any, next: any) {
  try {
    const { deviceToken, userId } = req.body;

    const userDataMongo = await userInfo.findOne({ _id: userId });

    if (userDataMongo) {
      if (!userDataMongo.deviceTokens.includes(deviceToken)) {
        // Push it into the string array
        userDataMongo.deviceTokens.push(deviceToken);
        console.log("Pushed");
      }
    }
  } catch (error) {
    next(error);
  }
}
