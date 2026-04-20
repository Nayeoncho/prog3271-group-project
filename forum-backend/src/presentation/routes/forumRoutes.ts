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
import { authenticate } from "../middleware/authenticate";

const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

// Post routes (public)
router.get("/posts", getAllPostsHandler);
router.get("/posts/:id", getPostByIdHandler);

// Post routes (protected)
router.post("/posts", authenticate, createPostHandler);
router.put("/posts/:id", authenticate, updatePostHandler);
router.delete("/posts/:id", authenticate, deletePostHandler);

// Comment routes (public)
router.get("/comments/:postId", getCommentsByPostHandler);

// Comment routes (protected)
router.post("/comments/:postId", authenticate, createCommentHandler);
router.delete("/comments/:id", authenticate, deleteCommentHandler);

export default router;
