import mongoose from "mongoose";

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
  messages: [
    {
      type: String, // message IDs
    },
  ],
});

export default mongoose.model("Group", groupSchema);
