import mongoose from "mongoose";
import { LikeEntity } from "../../domain/entities/like";

const likeSchema = new mongoose.Schema<LikeEntity>({
  userId: { type: String, required: true },
  postId: { type: String, required: true },
});

likeSchema.index({ userId: 1, postId: 1 }, { unique: true });
const LikeModel = mongoose.model<LikeEntity>("Like", likeSchema);

export default LikeModel;
