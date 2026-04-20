import bcrypt from "bcrypt";
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
}): Promise<Omit<UserEntity, "password">> => {
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

  // Return user info without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
