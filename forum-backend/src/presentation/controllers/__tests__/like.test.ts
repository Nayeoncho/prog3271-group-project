import { likePost, unlikePost } from "../../../application/usecases/like";
import { LikeRepo } from "../../../infrastructure/repositories/LikeRepo";
import PostModel from "../../../infrastructure/models/Post";

// using jest.mock instead of const, because we going to use mock DB
jest.mock("../../../infrastructure/repositories/LikeRepo");
jest.mock("../../../infrastructure/models/Post");

describe("Like Post function test", () => {
  test("should throw error if already liked", async () => {
    const mockRepo = new LikeRepo() as jest.Mocked<LikeRepo>;

    // Mock LikeRepo to simulate an existing like
    mockRepo.findByUserAndPost.mockResolvedValue({
      _id: "like1",
      userId: "user1",
      postId: "post1",
    });
    // Expect likePost to throw "Already liked" error
    await expect(likePost("user1", "post1")).rejects.toThrow("Already liked");
  });

  test("should create like and increment count", async () => {});
});

describe("Unlike Post function test", () => {
  test("should throw error if like not found", async () => {
    // 작성 예정
  });

  test("should delete like and decrement count", async () => {
    // 작성 예정
  });
});
