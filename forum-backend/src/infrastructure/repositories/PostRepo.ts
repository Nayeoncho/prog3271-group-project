import { IPostRepo } from "../../domain/repositories/IPostRepo";
import { PostEntity } from "../../domain/entities/post";
import PostModel from "../models/Post";

export class PostRepo implements IPostRepo {

    async create(post: PostEntity): Promise<PostEntity> {
        const createdPost = await PostModel.create(post);
        return createdPost.toObject();
    }

    async findAll(): Promise<PostEntity[]> {
        const posts = await PostModel.find().sort({createdAt: -1});
        return posts.map((post) => post.toObject());
    }

    async findById(id: string): Promise<PostEntity | null> {
        const post = await PostModel.findById(id);
        return post ? post.toObject() : null;
    }

    async update(id: string, data: Partial<PostEntity>): Promise<PostEntity | null> {
        const updatedPost = await PostModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });

        return updatedPost ? updatedPost.toObject() : null;
    }

    async delete(id: string): Promise<PostEntity | null> {
        const deletePost = await PostModel.findByIdAndDelete(id);

        return deletePost ? deletePost.toObject() : null;
    }
}