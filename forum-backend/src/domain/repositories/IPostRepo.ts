import { PostEntity } from "../entities/post";

export interface IPostRepo {
    create(post: PostEntity): Promise<PostEntity> // Creates a new post in the database
    findAll(): Promise<PostEntity[]>; // Retrieves all posts from the database
    findById(id: string): Promise<PostEntity | null>; // Retrieves a single post by its ID
}