import mongoose from "mongoose";

const userCredentialSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["User", "Developer", "Admin"],
      default: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    },
    refreshToken: String,
    refreshTokenExpires: Date,
    provider: {
      type: String,
      enum: ["github", "google", "bright"],
      default: "bright",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("credentials", userCredentialSchema);
