// Entry point - responsible only for middleware setup and route registration
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./infrastructure/database/mongo";
import forumRoutes from "./presentation/routes/forumRoutes";
import authRoutes from "./presentation/routes/authRoutes";
import adminRoutes from "./presentation/routes/adminRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware registration
app.use(cors());           // allows API calls from a different port (frontend)
app.use(express.json());   // parses request body as JSON

// Health check
app.get("/", (req, res) => {
  res.send("Forum backend is running");
});

// Route registration - add new routes here with a single line
app.use("/api", forumRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
