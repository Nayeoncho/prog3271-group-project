// Presentation Layer - Routes
// Maps URL paths to their corresponding controller functions
import { Router } from "express";
import { getForumSections } from "../controllers/forumController";
import { createPostHandler, getAllPostsHandler } from "../controllers/forumController";


const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

router.post("/posts", createPostHandler);
router.post("/posts", getAllPostsHandler);

export default router;
