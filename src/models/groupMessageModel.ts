import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  fromId: {
    type: String,
    required: true,
  },
  isSeen: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
  },
  multimedia: [
    {
      data: Buffer, // Use Buffer to store binary data
      contentType: String, // Specify the type of multimedia content, e.g., "image/jpeg"
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Message", messageSchema);
