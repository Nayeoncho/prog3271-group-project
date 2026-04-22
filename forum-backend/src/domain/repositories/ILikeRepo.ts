import { LikeEntity } from "../entities/like";

export interface ILikeRepo {
  create(like: LikeEntity): Promise<LikeEntity>;
  delete(userId: string, postId: string): Promise<LikeEntity | null>;
  findByUserAndPost(userId: string, postId: string): Promise<LikeEntity | null>;
}
