import mongoose from "mongoose";
import { UserEntity } from "../../domain/entities/user";

const userSchema = new mongoose.Schema<UserEntity>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel = mongoose.model<UserEntity>("User", userSchema);

export default UserModel;
