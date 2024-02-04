import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String,
    refreshTokenExpires: Date,
}, { timestamps: true });
module.exports = mongoose.model("user", userSchema);
