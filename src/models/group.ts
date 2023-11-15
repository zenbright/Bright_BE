import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    groupId: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "credentials", // Reference to the userCredentials model
        required: true, 
      },
    ],
    // TODO: messages or not
  });

export default mongoose.model("Group", groupSchema);
