import { IUserRepo } from "../../domain/repositories/IUserRepo";
import { UserEntity } from "../../domain/entities/user";
import UserModel from "../models/User";

export class UserRepo implements IUserRepo {
  // Create user model using Mongoose and save in the MongoDB
  async create(user: UserEntity): Promise<UserEntity> {
    const created = await UserModel.create(user);
    // Convert Mongoose objects -> JS objects
    return created.toObject();
  }

  // Function to find user by email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  // Function to find user by ID
  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);
    return user ? user.toObject() : null;
  }
}
