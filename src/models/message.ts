import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
    unique: true,
  },
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
  multimedia: {
    type: String, // Binary data of a file
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});


export default mongoose.model("Message", messageSchema);
