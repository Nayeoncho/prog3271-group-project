import { error } from "node:console";
import { PostEntity } from "../../domain/entities/post";
import { PostRepo } from "../../infrastructure/repositories/PostRepo";

const postRepo = new PostRepo();

// Creates a new post after validating required fields
export const createdPost = async (data: {
    title: string;
    content: string;
    authorId: string;
    authorName?: string;
}): Promise<PostEntity> => {
    
    if (!data.title || !data.content || !data.authorId){
        throw new Error("Title, content, and authorId are required");
    }

    return await postRepo.create({
        title: data.title,
        content: data.content,
        authorId: data.authorId,
        authorName: data.authorName,
    });
};

// Retrieves all posts
export const getAllPosts = async (): Promise<PostEntity[]> => {
    return await postRepo.findAll();
}

// Retrieves a single post by ID
export const getPostById = async (id: string): Promise<PostEntity> => {
    const post = await postRepo.findById(id);

    if (!post){
        throw new Error("Post not found");
    }

    return post;
}

// Updates a post only if it exists and belongs to the current user
export const updatePost = async (
    id: string, 
    currentUserId: string, 
    data: {
        title?: string; 
        content?: string;
    }
): Promise<PostEntity> => {
    const post = await postRepo.findById(id);

    if (!post){
        throw new Error("Post not found");
    }

    // Ownership validation
    if (post.authorId !== currentUserId){
        throw new Error("Unauthorized");
    }

    const updatedPost = await postRepo.update(id, {
        title: data.title,
        content: data.content,
    });

    if (!updatedPost){
        throw new Error("Failed to update post");
    }

    return updatedPost;
};

// Deletes a post only if it exists and belongs to the current user
export const deletePost = async (
    id: string,
    currentUserId: string
): Promise<PostEntity> => {
    const post = await postRepo.findById(id);

    if (!post){
        throw new Error("Post not found");
    }

    // Ownership validation
    if (post.authorId !== currentUserId){
        throw new Error("Unauthorized");
    }

    const deletedPost = await postRepo.delete(id);

    if (!deletedPost){
        throw new Error("Failed to delete post");
    }

    return deletedPost;
}