// Presentation Layer - Controller
// Receives HTTP requests, processes them, and returns responses
import { Request, Response } from "express";
import ForumSectionModel from "../../infrastructure/models/ForumSection";
import { createdPost, getAllPosts, getPostById } from "../../application/usecases/post";

// GET /api/forum-sections
// Fetches all forum sections from MongoDB and returns them as JSON
export const getForumSections = async (req: Request, res: Response) => {
  try {
    const sections = await ForumSectionModel.find();
    res.json(sections);
  } catch (error) {
    console.error("Error fetching forum sections:", error);
    res.status(500).json({ message: "Failed to fetch forum sections" });
  }
};

// POST /api/posts
export const createPostHandler = async (req: Request, res: Response) => {
  try {

    const {title, content, authorId, authorName} = req.body; // using this for now since we don't have login/JWT wired yet

    // uncomment below after PSGP-4 is done
    // const authorId = req.user.id;
    // const authorName = req.user.username;


    const post = await createdPost({
      title,
      content,
      authorId,
      authorName,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({message: "Failed to create post"});
  }
}

// GET /api/posts
export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({message: "Failed to fetch posts"});
  }
}

// GET /api/posts/:id
export const getPostByIdHandler = async (req: Request, res: Response) => {
  try {
    const post = await getPostById(req.params.id as string);

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    res.status(500).json({message: "Failed to fetch post"});
  }
}
