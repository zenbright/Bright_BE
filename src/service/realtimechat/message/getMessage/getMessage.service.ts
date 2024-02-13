import Message from "../../../../models/groupMessageModel";
import { RESPONSE_CODE } from "../../../utils/constants";
import { getMultimediaFromBucket } from "../handleMediaInBucket";

export async function getMessageService(params: { msgId: string }, res: any) {
  try {
    const { msgId } = params;

    console.log(msgId);
    const message = await Message.findOne({ _id: msgId });

    // Get multimedia
    const multimedia = await getMultimedia(message?.multimedia);

    return res.status(200).json({
      status: RESPONSE_CODE.SUCCESS,
      message: message,
      multimedia: multimedia,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMultimedia(mediaObjectIds: string[] | undefined) {
  let multimedia = [];
  if (mediaObjectIds) {
    for (const eachMedia of mediaObjectIds) {
      const mediaFromBucket = await getMultimediaFromBucket(eachMedia);
      multimedia.push(mediaFromBucket);
    }
  }
  return multimedia;
}
