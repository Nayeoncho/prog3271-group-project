import { error } from "node:console";
import { PostEntity } from "../../domain/entities/post";
import { PostRepo } from "../../infrastructure/repositories/PostRepo";

const postRepo = new PostRepo();

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

export const getAllPosts = async (): Promise<PostEntity[]> => {
    return await postRepo.findAll();
}

export const getPostById = async (id: string): Promise<PostEntity> => {
    const post = await postRepo.findById(id);

    if (!post){
        throw new Error("Post not found");
    }

    return post;
}