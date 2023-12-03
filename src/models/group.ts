import mongoose from "mongoose";
import message from "./message";

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
  },
  users: [
    {
      type: String,
      required: true,
    },
  ],
  messages: {
    type: Map,
    of: String,
    default: new Map(), 
  },
});

export default mongoose.model("Group", groupSchema);
