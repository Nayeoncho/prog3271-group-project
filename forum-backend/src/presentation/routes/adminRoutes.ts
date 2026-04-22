// Presentation Layer - Admin Routes
// Maps admin URL paths to their corresponding controller functions
import { Router } from "express";
import {
  getStatusHandler,
  adminUpdatePostHandler,
  adminDeletePostHandler,
} from "../controllers/adminController";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/stats", authenticate, authorizeAdmin, getStatusHandler);
router.put("/posts/:id", authenticate, authorizeAdmin, adminUpdatePostHandler);
router.delete(
  "/posts/:id",
  authenticate,
  authorizeAdmin,
  adminDeletePostHandler,
);

export default router;
