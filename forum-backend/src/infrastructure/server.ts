// Hardcoded data in this file for testing API
// Create a library for API server
// Express: API server framework
// cors: It makes HTML can call API in the different port
import express from "express";
import cors from "cors";

// Create server instance and define the port
const app = express();
const port = 3000;

// Setting middleware
app.use(cors());
app.use(express.json());

// Route hardcoded for testing
app.get("/", (req, res) => {
  res.send("Forum backend is running");
});

// API route
// get hardcoded database (/api/forum-sections)
app.get("/api/forum-sections", (req, res) => {
  res.json([
    {
      id: "section-1",
      title: "Web Design Help",
      description:
        "Questions and answers regarding layout, style, and other visual web design concepts.",
      forums: [
        {
          id: "forum-1",
          title: "Website Ratings and Reviews",
          description:
            "Want to know how other people like your website? Post a link here to get ratings and reviews of the web designer!",
          viewingCount: 21,
          threads: 7167,
          posts: 57532,
          iconColor: "green",
          lastPost: {
            title: "No Website Traffic",
            author: "deltz",
            createdAt: "2019-08-27T01:43:00",
          },
        },
        {
          id: "forum-2",
          title: "General Web Design Discussion",
          description:
            "Have general questions about web design? Need help figuring out how to lay your site out?",
          viewingCount: 21,
          threads: 8003,
          posts: 48533,
          iconColor: "green",
          lastPost: {
            title: "Where Are They Getting The...",
            author: "Bob007",
            createdAt: "2019-08-26T11:46:00",
          },
        },
      ],
    },
    {
      id: "section-2",
      title: "Design Software Help",
      description: "Get help with top Design Software titles.",
      forums: [
        {
          id: "forum-3",
          title: "Adobe Photoshop Help",
          description:
            "Need help with developing raster graphics? Post your Photoshop questions here.",
          viewingCount: 2,
          threads: 1362,
          posts: 8289,
          iconColor: "gray",
          lastPost: {
            title: "Photoshop output quality...",
            author: "chrisj",
            createdAt: "2019-05-21T10:40:00",
          },
        },
      ],
    },
  ]);
});

// Execute server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
