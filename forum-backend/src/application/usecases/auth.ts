import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserEntity } from "../../domain/entities/user";
import { UserRepo } from "../../infrastructure/repositories/UserRepo";

const userRepo = new UserRepo();

export const register = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<Omit<UserEntity, "password">> => {
  // Checking email duplicate
  const existing = await userRepo.findByEmail(data.email);
  if (existing) {
    throw new Error("Email already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Saving user
  const created = await userRepo.create({
    username: data.username,
    email: data.email,
    password: hashedPassword,
    // set a default role as user (to make sure specific user can get admin role)
    role: "user",
  });

  // Return execpt password
  const { password, ...userWithoutPassword } = created;
  return userWithoutPassword;
};

// Login method
export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ user: Omit<UserEntity, "password">; token: string }> => {
  // Function to find user by email
  const user = await userRepo.findByEmail(data.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Function to check password
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT token
  const secret = process.env.JWT_SECRET!;
  const expiresIn = (process.env.JWT_EXPIRES_IN ||
    "7d") as jwt.SignOptions["expiresIn"];
  const token = jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn,
  });

  // Return user info without password + token
  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

// Get current user method
export const getCurrentUser = async (
  id: string,
): Promise<Omit<UserEntity, "password">> => {
  // Find user by ID from token
  const user = await userRepo.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  // Return user info without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
