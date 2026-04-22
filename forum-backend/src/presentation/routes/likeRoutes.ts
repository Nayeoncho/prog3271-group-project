// Presentation Layer - Auth Routes
// Maps auth URL paths to their corresponding controller functions
import { Router } from "express";
import {
  likePostHandler,
  unlikePostHandler,
} from "../controllers/likeController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// POST /posts/:id/like -> runs the likeHandler controller
router.post("/:id/like", authenticate, likePostHandler);

// DELETE /posts/:id/like -> runs the unlikeHandler controller
router.delete("/:id/like", authenticate, unlikePostHandler);
export default router;
