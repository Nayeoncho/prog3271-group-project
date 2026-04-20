import { UserEntity } from "../../domain/entities/user";
import { UserRepo } from "../../infrastructure/repositories/UserRepo";

const userRepo = new UserRepo();

export const register = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<Omit<UserEntity, "password">> => {

  // 1. 이미 가입된 이메일인지 체크
  const existing = await userRepo.findByEmail(data.email);
  if (existing) {
    throw new Error("Email already in use");
  }

  // 2. 유저 저장 (비밀번호 hash는 PSGP-39에서 추가 예정)
  const created = await userRepo.create({
    username: data.username,
    email: data.email,
    password: data.password,
    role: "user",
  });

  // 3. 비밀번호 제외하고 반환
  const { password, ...userWithoutPassword } = created;
  return userWithoutPassword;
};
