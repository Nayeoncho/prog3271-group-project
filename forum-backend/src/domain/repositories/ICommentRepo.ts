import { CommentEntity } from "../entities/comments";

export interface ICommentRepo {
    create(comment: CommentEntity): Promise<CommentEntity>; // Creates a new comment in the database
    findByPostId(postId: string): Promise<CommentEntity[]>; // Gets all comments for a specific post
    findById(id: string): Promise<CommentEntity | null>; // Finds one comment by its ID
    delete(id: string): Promise<CommentEntity | null>; // Deletes a comment by its ID
}