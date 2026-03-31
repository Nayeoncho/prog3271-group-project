// Express: API server framework
// cors: It makes HTML can call API in the different port
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./infrastructure/database/mongo";
import ForumSectionModel from "./infrastructure/models/ForumSection";

dotenv.config();

// Create server instance and define the port
const app = express();
const port = process.env.PORT || 3000;

// Setting middleware
app.use(cors());
app.use(express.json());

// Route forum data
app.get("/", (req, res) => {
  res.send("Forum backend is running");
});

// Route forum sections data
app.get("/api/forum-sections", async (req, res) => {
  try {
    const sections = await ForumSectionModel.find();
    res.json(sections);
  } catch (error) {
    console.log("Error fetching forum sections:", error);
    res.status(500).json({ message: "Failed to fetch forum sections" });
  }
});

// Execute server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
