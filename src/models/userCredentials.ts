import mongoose from "mongoose";

const userCredentialSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Developer", "Admin"],
        default: "User",
    },
    userId: mongoose.Schema.Types.ObjectId,
    refreshToken: String,
    refreshTokenExpires: Date,
}, {
    timestamps: true,
});

export default mongoose.model("Credentials", userCredentialSchema);
