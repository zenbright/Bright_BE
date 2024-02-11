import userInfo from "../../../../models/userInfoModel";

export async function saveDeviceTokenService(req: any, res: any, next: any) {
  try {
    const { deviceToken, userId } = req.body;

    const userDataMongo = await userInfo.findOne({ _id: userId });

    if (userDataMongo) {
      if (!userDataMongo.deviceTokens.includes(deviceToken)) {
        userDataMongo.deviceTokens.push(deviceToken);
        userDataMongo.save();
      }
      console.log("userDataMongo.deviceTokens", userDataMongo.deviceTokens);
    }
  } catch (error) {
    next(error);
  }
}
