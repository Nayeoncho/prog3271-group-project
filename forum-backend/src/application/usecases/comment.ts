import { CommentEntity } from "../../domain/entities/comments";
import { CommentRepo } from "../../infrastructure/repositories/CommentRepo";

const commentRepo = new CommentRepo();

// Creates a new comment after validating required fields
export const createdcomment = async (data: {
    content: string;
    postId: string;
    authorId: string;
    authorName?: string;
}): Promise<CommentEntity> => {
    
    if (!data.content || !data.postId || !data.authorId){
        throw new Error("Content, postId, and authorId are required");
    }

    return await commentRepo.create({
        content: data.content,
        postId: data.postId,
        authorId: data.authorId,
        authorName: data.authorName,
    });
};

// Retrieves all comments for a specific post
export const getCommentsByPostId = async (
    postId: string
): Promise<CommentEntity[]> => {
    return await commentRepo.findByPostId(postId);
};

// Deletes a comment only if it exists and belongs to the current user
export const deleteComment = async(
    id: string,
    currentUserId: string
): Promise<CommentEntity> => {
    const comment = await commentRepo.findById(id);

    if (!comment){
        throw new Error("Comment not found");
    }

    // Ownership validation
    if(comment.authorId !== currentUserId){
        throw new Error("Unauthorized");
    }

    const deletedComment = await commentRepo.delete(id);

    if (!deletedComment){
        throw new Error("Failed to delete comment");
    }

    return deletedComment;
}
