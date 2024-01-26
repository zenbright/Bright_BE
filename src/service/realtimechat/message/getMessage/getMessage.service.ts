import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";

export async function getMessageService(params: { msgId: string }, res: any) {
  try {
    const { msgId } = params;

    console.log(msgId);
    const message = await Message.findOne({ _id: msgId });

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      message: message,
    });
  } catch (error) {
    console.log(error);
  }
}
