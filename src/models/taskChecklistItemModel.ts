import mongoose from "mongoose";

const checklistItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model("checklistItem", checklistItemSchema);
