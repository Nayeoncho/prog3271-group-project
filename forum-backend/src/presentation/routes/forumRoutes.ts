// Presentation Layer - Routes
// Maps URL paths to their corresponding controller functions
import { Router } from "express";
import { getForumSections } from "../controllers/forumController";
import { createdPost } from "../../application/usecases/post";


const router = Router();

// GET /api/forum-sections → runs the getForumSections controller
router.get("/forum-sections", getForumSections);

router.post("/posts", createdPost);

export default router;
