// Infrastructure Layer - Mongoose Model
import mongoose from "mongoose";
import { UserEntity } from "../../domain/entities/user";

const userSchema = new mongoose.Schema<UserEntity>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "super"], default: "user" },
  },
  {
    collection: "users", // stored as "users" collection in Atlase
    timestamps: true, // auto-generates createdAt, updatedAt
  },
);

const UserModel = mongoose.model<UserEntity>("User", userSchema);

export default UserModel;
