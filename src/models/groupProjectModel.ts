import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    groupId: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

export default mongoose.model("project", projectSchema);
