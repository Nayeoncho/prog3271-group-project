// Hardcoded data in this file for testing API
// Create a library for API server
// Express: API server framework
// cors: It makes HTML can call API in the different port
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./infrastructure/database/mongo";
import ForumSectionModel from "./infrastructure/models/ForumSection";

dotenv.config();
connectDB(); // connect with DB

// Create server instance and define the port
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

// Setting middleware
app.use(cors());
app.use(express.json());

// Route forum sections data
app.get("/api/forum-sections", async (req, res) => {
  // res.send("Forum backend is running");
  try {
    const sections = await ForumSectionModel.find(); // Read the real data from DB
    res.json(sections); // Send data to browser
  } catch (error) {
    console.log("Error fetching firum sections: ", error);
    res.status(500).json({ message: "Failed to fetch forum sections" });
  }
});

// Execute server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
