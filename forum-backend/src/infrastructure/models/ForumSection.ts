import mongoose from "mongoose";

const lastPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  createdAt: String,
});

const forumSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  viewingCount: Number,
  threads: Number,
  posts: Number,
  iconColor: String,
  lastPost: lastPostSchema,
});

const forumSectionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    forums: [forumSchema],
  },
  {
    collection: "forumSections",
  },
);

const ForumSectionModel = mongoose.model("ForumSection", forumSectionSchema);

export default ForumSectionModel;
