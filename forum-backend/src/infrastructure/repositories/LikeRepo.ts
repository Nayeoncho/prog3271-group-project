import { ILikeRepo } from "../../domain/repositories/ILikeRepo";
import { LikeEntity } from "../../domain/entities/like";
import LikeModel from "../models/Like";

export class LikeRepo implements ILikeRepo {
  // save like
  async create(like: LikeEntity): Promise<LikeEntity> {
    const createdLike = await LikeModel.create(like);
    return createdLike.toObject();
  }

  // delete like
  async delete(userId: string, postId: string): Promise<LikeEntity | null> {
    const deleteLike = await LikeModel.findOneAndDelete({ userId, postId });
    return deleteLike ? deleteLike.toObject() : null;
  }

  // check duplication
  async findByUserAndPost(
    userId: string,
    postId: string,
  ): Promise<LikeEntity | null> {
    const checkDuplication = await LikeModel.findOne({ userId, postId });
    return checkDuplication ? checkDuplication.toObject() : null;
  }
}
