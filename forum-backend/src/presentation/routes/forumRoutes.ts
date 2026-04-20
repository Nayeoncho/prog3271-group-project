// Presentation Layer - Routes
// Maps URL paths to their corresponding controller functions
import { Router } from "express";
import { getForumSections, createPostHandler, getAllPostsHandler, getPostByIdHandler, deletePostHandler, updatePostHandler } from "../controllers/forumController";


const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

router.post("/posts", createPostHandler);
router.get("/posts", getAllPostsHandler);
router.get("/posts/:id", getPostByIdHandler);
router.put("/posts/:id", updatePostHandler)
router.delete("/posts/:id", deletePostHandler)

export default router;
