import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    messageData: {
        type: Object,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now(),
    }
});

export default mongoose.model("message", messageSchema);
