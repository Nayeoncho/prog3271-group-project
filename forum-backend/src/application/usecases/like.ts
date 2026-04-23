import { LikeRepo } from "../../infrastructure/repositories/LikeRepo";
import PostModel from "../../infrastructure/models/Post";

export const likePost = async (
  userId: string,
  postId: string,
): Promise<void> => {
  const likeRepo = new LikeRepo();
  // check duplication
  const existing = await likeRepo.findByUserAndPost(userId, postId);
  if (existing) {
    throw new Error("Already liked");
  }

  // save like
  await likeRepo.create({ userId, postId });

  // increase like count
  await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
};

export const unlikePost = async (
  userId: string,
  postId: string,
): Promise<void> => {
  const likeRepo = new LikeRepo();
  // check like history
  const existing = await likeRepo.findByUserAndPost(userId, postId);
  if (!existing) {
    throw new Error("Like not found");
  }

  // delete like
  await likeRepo.delete(userId, postId);

  // decrease like count
  await PostModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
};
