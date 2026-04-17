import { Request, Response } from "express";
import ForumSectionModel from "../../infrastructure/models/ForumSection";

export const getForumSections = async (req: Request, res: Response) => {
  try {
    const sections = await ForumSectionModel.find();
    res.json(sections);
  } catch (error) {
    console.error("Error fetching forum sections:", error);
    res.status(500).json({ message: "Failed to fetch forum sections" });
  }
};
