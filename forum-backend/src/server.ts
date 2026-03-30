// Hardcoded data in this file for testing API
// Create a library for API server
// Express: API server framework
// cors: It makes HTML can call API in the different port
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./infrastructure/database/mongo";

dotenv.config();
connectDB(); // connect with DB

// Create server instance and define the port
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;

// Setting middleware
app.use(cors());
app.use(express.json());

// Route hardcoded for testing
app.get("/", (req, res) => {
  res.send("Forum backend is running");
});

// Execute server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
