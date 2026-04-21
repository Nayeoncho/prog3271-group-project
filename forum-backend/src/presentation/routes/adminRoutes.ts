// Presentation Layer - Admin Routes
// Maps admin URL paths to their corresponding controller functions
import { Router } from "express";
import { getStatusHandler } from "../controllers/adminController";
import { authorizeAdmin } from "../middleware/authorizeAdmin";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.get("/stats", authenticate, authorizeAdmin, getStatusHandler);

export default router;
