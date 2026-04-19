export interface PostEntity {
    _id?: string;
    title: string;
    content: string;
    authorId: string;
    authorName?: string;
    createdAt?: string;
    updatedAt?: string;
}