export interface CommentEntity {
    _id?: string;
    content: string;
    postId: string;
    authorId: string;
    authorName?: string;
    createdAt?: Date;
    updatedAt?: Date;
}