import { Request, Response } from "express";
import { likePost, unlikePost } from "../../application/usecases/like";

// POST /api/posts/:id/like
export const likePostHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const postId = req.params.id as string;

    await likePost(userId, postId);

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error: any) {
    if (error.message === "Already liked") {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Failed to like post" });
  }
};

// DELETE /api/posts/:id/like
export const unlikePostHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const postId = req.params.id as string;

    await unlikePost(userId, postId);

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error: any) {
    if (error.message === "Like not found") {
      res.status(409).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Failed to unlike post" });
  }
};
