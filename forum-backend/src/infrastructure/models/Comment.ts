import mongoose from "mongoose";
import { CommentEntity } from "../../domain/entities/comments";

const CommentSchema = new mongoose.Schema<CommentEntity> (
    {
        content: {type: String, required: true},
        postId: {type: String, required: true},
        authorId: {type: String, required: true},
        authorName: {type: String, required: false},
    },
    {
        collection: "comments",
        timestamps: true,
    }
);

const CommentModel = mongoose.model<CommentEntity>("Comment", CommentSchema);

export default CommentModel;