// Presentation Layer - Controller
// Receives HTTP requests, processes them, and returns responses
import { Request, Response } from "express";
import ForumSectionModel from "../../infrastructure/models/ForumSection";
import {
  createdPost,
  getAllPosts,
  getPostById,
  deletePost,
  updatePost,
} from "../../application/usecases/post";
import {
  createdcomment,
  getCommentsByPostId,
  deleteComment,
} from "../../application/usecases/comment";

interface IdParams {
  id: string;
}

interface PostIdParams {
  postId: string;
}

interface PostParams {
  id: string;
}

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
    // const {title, content, authorId, authorName} = req.body; // using this for now since we don't have login/JWT wired yet

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // uncomment below after PSGP-4 is done
    const authorId = req.user?.id;
    const authorName = req.user?.username;
    const { title, content } = req.body;

    const post = await createdPost({
      title,
      content,
      authorId,
      authorName,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to create post" });
  }
};

// GET /api/posts
export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// GET /api/posts/:id
export const getPostByIdHandler = async (req: Request, res: Response) => {
  try {
    const post = await getPostById(req.params.id as string);

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);

    if (error instanceof Error && error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to fetch post" });
  }
};

// PUT api/posts/:id
export const updatePostHandler = async (
  req: Request<PostParams>,
  res: Response,
) => {
  try {
    // const { title, content, authorId } = req.body; // using this for now since we don't have login/JWT wired yet

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // uncomment below after PSGP-4 is done
    const authorId = req.user?.id;
    const { title, content } = req.body;

    const updatedPost = await updatePost(req.params.id as string, authorId, {
      title,
      content,
    });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);

    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update post" });
  }
};

// DELETE
export const deletePostHandler = async (
  req: Request<PostParams>,
  res: Response,
) => {
  try {
    // const { authorId } = req.body; // using this for now since we don't have login/JWT wired yet

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // uncomment below after PSGP-4 is done
    const authorId = req.user?.id;

    await deletePost(req.params.id as string, authorId);

    res.json({ message: "post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);

    if (error instanceof Error) {
      if (error.message === "Post not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to delete post" });
  }
};

// POST /api/comments/:postId
export const createCommentHandler = async (
  req: Request<PostIdParams>,
  res: Response,
) => {
  try {
    // const { content, authorId, authorName } = req.body; // using this for now since we don't have login/JWT wired yet

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // uncomment below after PSGP-4 is done
    const authorId = req.user?.id;
    const authorName = req.user?.username;
    const { content } = req.body;

    const comment = await createdcomment({
      content,
      postId: req.params.postId as string,
      authorId,
      authorName,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);

    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to create comment" });
  }
};

// GET /api/comments/:postId
export const getCommentsByPostHandler = async (
  req: Request<PostIdParams>,
  res: Response,
) => {
  try {
    const comments = await getCommentsByPostId(req.params.postId as string);

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);

    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

// DELETE /api/comments/:id
export const deleteCommentHandler = async (
  req: Request<IdParams>,
  res: Response,
) => {
  try {
    // const { authorId } = req.body; // using this for now since we don't have login/JWT wired yet

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // uncomment below after PSGP-4 is done
    const authorId = req.user?.id;

    await deleteComment(req.params.id as string, authorId);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);

    if (error instanceof Error) {
      if (error.message === "Comment not found") {
        return res.status(404).json({ message: error.message });
      }

      if (error.message === "Unauthorized") {
        return res.status(403).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to delete comment" });
  }
};
