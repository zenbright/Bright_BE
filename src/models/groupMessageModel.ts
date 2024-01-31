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
      type: String,
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Message", messageSchema);
