import userInformation from "../../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function searchUserService(req: any, res: any, next: any) {
  try {
    const { searchPhrase } = req.body;

    const allUserInfo = await userInformation.find();

    if (allUserInfo) {
      const filteredUserInfo = allUserInfo.filter(
        (userInfo) =>
          userInfo.fullname &&
          userInfo.fullname.toLowerCase().includes(searchPhrase.toLowerCase())
      );

      if (filteredUserInfo.length > 0) {
        const fullnames = filteredUserInfo.map((userInfo) => userInfo.fullname);

        return res.status(200).json({
          message: SUCCESS_MESSAGE,
          data: fullnames,
        });
      } else {
        res.status(404).json({
          message: ERROR_CODE.USER_NOT_FOUND,
        });
      }
    } else {
      res.status(404).json({
        message: ERROR_CODE.USER_NOT_FOUND,
      });
    }
  } catch (error) {
    next(error);
  }
}