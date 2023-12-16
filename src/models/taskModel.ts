import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
        type: String,
        enum: ["Incompleted", "On-going", "Completed"],
        default: "Incompleted",
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
        type: String, // e.g. Jan-2024
        required: true,
    }
  },
);

export default mongoose.model("task", taskSchema);
