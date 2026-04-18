// Domain Layer - Repository Interface
// Defines how user data is accessed without any DB implementation details
import { UserEntity } from "../entities/user";

export interface IUserRepo {
  // Find a user by email - used during login
  findByEmail(email: string): Promise<UserEntity | null>;

  // Find a user by ID - used after JWT authentication to retrieve user info
  findById(id: string): Promise<UserEntity | null>;

  // Create a new user - used during registration
  create(user: UserEntity): Promise<UserEntity>;
}
