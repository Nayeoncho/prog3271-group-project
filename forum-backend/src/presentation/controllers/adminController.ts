import { Request, Response } from "express";
import { getAdminStats } from "../../application/usecases/admin";
import {
  adaminUpdatePost,
  adminDeletePost,
} from "../../application/usecases/post";

interface IdParams {
  id: string;
}

export const getStatusHandler = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

export const adminUpdatePostHandler = async (
  req: Request<IdParams>,
  res: Response,
) => {
  try {
    const { title, content } = req.body;

    const updatedPost = await adaminUpdatePost(req.params.id, {
      title,
      content,
    });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post as admin:", error);

    if (error instanceof Error && error.message == "Post not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: "Failed to updat post" });
  }
};

export const adminDeletePostHandler = async (
  req: Request<IdParams>,
  res: Response,
) => {
  try {
    await adminDeletePost(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post as admin:", error);

    if (error instanceof Error && error.message === "Post not found") {
      return res.status(404).json({ message: error.message });
    }

    res.status(400).json({ message: "Failed to delete post" });
  }
};
