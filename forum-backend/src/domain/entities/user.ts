export interface UserEntity {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "super";
  createdAt?: Date;
  updatedAt?: Date;
}
