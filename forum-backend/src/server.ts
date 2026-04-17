import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./infrastructure/database/mongo";
import forumRoutes from "./presentation/routes/forumRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Forum backend is running");
});

app.use("/api", forumRoutes);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
