import { IUserRepo } from "../../domain/repositories/IUserRepo";
import { UserEntity } from "../../domain/entities/user";
import UserModel from "../models/User";

export class UserRepo implements IUserRepo {
  async create(user: UserEntity): Promise<UserEntity> {
    const created = await UserModel.create(user);
    return created.toObject();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await UserModel.findOne({ email });
    return user ? user.toObject() : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await UserModel.findById(id);
    return user ? user.toObject() : null;
  }
}
