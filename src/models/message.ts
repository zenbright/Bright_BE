import mongoose from "mongoose";

const messageDataSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "credentials",
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
    order: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Message", messageDataSchema);
