import userCredentials from "../../models/userCredentials";
import userInformation from "../../models/userInfo";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../utils/constants";

export async function realtimeChatService(req: any, res: any, next: any) {
  try {
    const { userId, socketId, message } = req.body;
  
  } catch (error) {
    next(error);
  }
}
