import { Request, Response } from "express";
import { getAdminStats } from "../../application/usecases/admin";

export const getStatusHandler = async (req: Request, res: Response) => {
  try {
    const stats = await getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
