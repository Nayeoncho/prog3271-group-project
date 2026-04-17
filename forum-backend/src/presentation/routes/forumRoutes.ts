import { Router } from "express";
import { getForumSections } from "../controllers/forumController";

const router = Router();

router.get("/forum-sections", getForumSections);

export default router;
