// Presentation Layer - Routes
// Maps URL paths to their corresponding controller functions
import { Router } from "express";
import { getForumSections, createPostHandler, getAllPostsHandler, getPostByIdHandler } from "../controllers/forumController";


const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

router.post("/posts", createPostHandler);
router.post("/posts", getAllPostsHandler);
router.post("/posts/:id", getPostByIdHandler);

export default router;
