import mongoose from "mongoose";
import { PostEntity } from "../../domain/entities/post";

const postSchema = new mongoose.Schema<PostEntity>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    authorName: { type: String, required: false },
    likeCount: { type: Number, default: 0 },
  },
  {
    collection: "posts",
    timestamps: true,
  },
);

const PostModel = mongoose.model<PostEntity>("Post", postSchema);

export default PostModel;
