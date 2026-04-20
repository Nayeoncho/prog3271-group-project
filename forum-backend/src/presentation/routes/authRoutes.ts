// Presentation Layer - Auth Routes
// Maps auth URL paths to their corresponding controller functions
import { Router } from "express";
import { registerHandler, loginHandler, getCurrentUserHandler } from "../controllers/authController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// POST /api/auth/register → runs the registerHandler controller
router.post("/register", registerHandler);

// POST /api/auth/login → runs the loginHandler controller
router.post("/login", loginHandler);

// GET /api/auth/me → returns current logged in user (protected)
router.get("/me", authenticate, getCurrentUserHandler);

export default router;
