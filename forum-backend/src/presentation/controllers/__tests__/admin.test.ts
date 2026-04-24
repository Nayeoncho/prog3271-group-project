import { getAdminStats } from "../../../application/usecases/admin";
import UserModel from "../../../infrastructure/models/User";
import PostModel from "../../../infrastructure/models/Post";
import CommentModel from "../../../infrastructure/models/Comment";
import LikeModel from "../../../infrastructure/models/Like";

// Mock dataset
jest.mock("../../../infrastructure/models/User");
jest.mock("../../../infrastructure/models/Post");
jest.mock("../../../infrastructure/models/Comment");
jest.mock("../../../infrastructure/models/Like");

// TEST 1: Check everything returns correct numbers
describe("Test 1: Check everything returns correct numbers", () => {
  test("Returns correct admin stats", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(10);
    (PostModel.countDocuments as any).mockResolvedValue(20);
    (CommentModel.countDocuments as any).mockResolvedValue(30);
    (LikeModel.countDocuments as any).mockResolvedValue(40);

    const result = await getAdminStats();

    // check final result
    expect(result).toEqual({
      totalUsers: 10,
      totalPosts: 20,
      totalComments: 30,
      totalLikes: 40,
    });
  });
});

// TEST 2: Check only users count
describe("TEST 2: Check only users count", () => {
  test("counts users correctly", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(5);
    (PostModel.countDocuments as any).mockResolvedValue(0);
    (CommentModel.countDocuments as any).mockResolvedValue(0);
    (LikeModel.countDocuments as any).mockResolvedValue(0);

    const result = await getAdminStats();

    // should return 5 users
    expect(result.totalUsers).toBe(5);
  });
});

// TEST 3: Check only posts count
describe("TEST 3: Check only posts count", () => {
  test("counts posts correctly", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(0);
    (PostModel.countDocuments as any).mockResolvedValue(7);
    (CommentModel.countDocuments as any).mockResolvedValue(0);
    (LikeModel.countDocuments as any).mockResolvedValue(0);

    const result = await getAdminStats();

    // should return 7 posts
    expect(result.totalPosts).toBe(7);
  });
});

// TEST 4: Check only Comment count
describe("TEST 4: Check only Comment count", () => {
  test("counts comment correctly", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(0);
    (PostModel.countDocuments as any).mockResolvedValue(0);
    (CommentModel.countDocuments as any).mockResolvedValue(23);
    (LikeModel.countDocuments as any).mockResolvedValue(0);

    const result = await getAdminStats();

    // should return 23 comments
    expect(result.totalComments).toBe(23);
  });
});

// TEST 5: Check only Like count
describe("TEST 5: Check only Like count", () => {
  test("counts like correctly", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(0);
    (PostModel.countDocuments as any).mockResolvedValue(0);
    (CommentModel.countDocuments as any).mockResolvedValue(0);
    (LikeModel.countDocuments as any).mockResolvedValue(300);

    const result = await getAdminStats();

    // should return 300 likes
    expect(result.totalLikes).toBe(300);
  });
});

// TEST 6: check when everything is 0
describe("TEST 6: Check only posts count", () => {
  test("counts posts correctly", async () => {
    // Fake valuse from database
    (UserModel.countDocuments as any).mockResolvedValue(0);
    (PostModel.countDocuments as any).mockResolvedValue(0);
    (CommentModel.countDocuments as any).mockResolvedValue(0);
    (LikeModel.countDocuments as any).mockResolvedValue(0);

    const result = await getAdminStats();

    // everything should be 0
    expect(result).toEqual({
      totalUsers: 0,
      totalPosts: 0,
      totalComments: 0,
      totalLikes: 0,
    });
  });
});
