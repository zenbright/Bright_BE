import mongoose from "mongoose";

const OTPverificationSchema = new mongoose.Schema({
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

export default mongoose.model("OTPverification", OTPverificationSchema);
