import mongoose from "mongoose";
import message from "./groupMessageModel";

const groupSchema = new mongoose.Schema({
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