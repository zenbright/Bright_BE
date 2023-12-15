import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    checklist: [
      // store id of checklist items
      {
        type: String,
      },
    ],
    assignedMembers: [
      // store id of users
      {
        type: String,
      },
    ],
    dueDate: {
      type: Date,
    },
    belongedMonth: {
        type: String, //TODO: validate the fomat of month-year
        required: true,
    }
  },
);

export default mongoose.model("task", taskSchema);
