import { Request, Response } from "express";
import { register } from "../../application/usecases/auth";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // check require inputs
    if (!username || !email || !password) {
      res
        .status(400)
        .json({ message: "Username, email, and password are required" });
      return;
    }

    // call a register use case
    const user = await register({ username, email, password });

    // Success response
    res.status(201).json(user);
  } catch (error: any) {
    // Email duplicated error
    if (error.message === "Email already in use") {
      res.status(409).json({ message: error.message });
      return;
    }
    // Server error
    console.error("Register error:", error);
    res.status(500).json({ message: "Failed to register" });
  }
};
