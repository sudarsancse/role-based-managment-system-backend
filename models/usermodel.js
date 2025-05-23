import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "hr", "user"],
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("Users", userSchema);

export default UserData;
