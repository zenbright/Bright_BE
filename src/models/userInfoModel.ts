import mongoose from "mongoose";

const userInfoSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    dayOfBirth: {
      type: Date,
    },
    email: {
      address: String,
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    social: {
      facebook: String,
      twitter: String,
      instagram: String,
      github: String,
    },
    deviceTokens: [
      {
        type: String,
      },
    ],
    profileImage: Buffer,
    userCredentialId: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("users", userInfoSchema);
