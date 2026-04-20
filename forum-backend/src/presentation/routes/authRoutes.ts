// Presentation Layer - Auth Routes
// Maps auth URL paths to their corresponding controller functions
import { Router } from "express";
import { registerHandler } from "../controllers/authController";

const router = Router();

// POST /api/auth/register → runs the registerHandler controller
router.post("/register", registerHandler);

export default router;
