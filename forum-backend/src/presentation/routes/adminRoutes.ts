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
import { authorizeSuper } from "../middleware/authorizeSuper";

const router = Router();

router.get("/stats", authenticate, authorizeAdmin, getStatusHandler);
router.put("/posts/:id", authenticate, authorizeSuper, adminUpdatePostHandler);
router.delete(
  "/posts/:id",
  authenticate,
  authorizeSuper,
  adminDeletePostHandler,
);

export default router;
