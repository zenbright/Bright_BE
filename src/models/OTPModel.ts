import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  OTP: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("OTPCode", OTPSchema);
