import userCredentials from "../../../models/userCredentials";
import messageData from "../../../models/message";
import { ERROR_CODE, SUCCESS_MESSAGE } from "../../utils/constants";

export async function realtimeChatService(userId: string, messageData: any) {
  try {
    const { userId, message, timestamp } = messageData;

    await storeNewMessage(userId, message, timestamp);
  } catch (error) {
    // next(error);
  }
}

async function storeNewMessage(
  userId: string,
  message: string,
  timestamp: Date,
) {
  const newMessageData = new messageData({
    userId: userId,
    message: message,
    timeStamp: timestamp,
  });

  await newMessageData.save();
}
