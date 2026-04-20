import { ICommentRepo } from "../../domain/repositories/ICommentRepo";
import { CommentEntity } from "../../domain/entities/comments";
import CommentModel from "../models/Comment";

export class CommentRepo implements ICommentRepo {

    async create(comment: CommentEntity): Promise<CommentEntity> {
        const createdComment = await CommentModel.create(comment);
        return createdComment.toObject();
    }

    async findByPostId(postId: string): Promise<CommentEntity[]> {
        const comments = await CommentModel.find({postId}).sort({createdAt: -1});
        return comments.map((comments) => comments.toObject());
    }

    async findById(id: string): Promise<CommentEntity | null> {
        const comment = await CommentModel.findById(id);
        return comment ? comment.toObject() : null;
    }

    async delete(id: string): Promise<CommentEntity | null> {
        const deletedComment = await CommentModel.findByIdAndDelete(id);
        return deletedComment ? deletedComment.toObject() : null;
    }

}