// Presentation Layer - Routes
// Maps URL paths to their corresponding controller functions
import { Router } from "express";
import {
  getForumSections,
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  deletePostHandler,
  updatePostHandler,
  createCommentHandler,
  getCommentsByPostHandler,
  deleteCommentHandler,
} from "../controllers/forumController";

const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

// Post routes
router.post("/posts", createPostHandler);
router.get("/posts", getAllPostsHandler);
router.get("/posts/:id", getPostByIdHandler);
router.put("/posts/:id", updatePostHandler);
router.delete("/posts/:id", deletePostHandler);

// Comment routes
router.post("/comments/:postId", createCommentHandler);
router.get("/comments/:postId", getCommentsByPostHandler);
router.delete("/comments/:id", deleteCommentHandler);

export default router;
