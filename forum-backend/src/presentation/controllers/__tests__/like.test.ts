import { likePost, unlikePost } from "../../../application/usecases/like";
import { LikeRepo } from "../../../infrastructure/repositories/LikeRepo";
import PostModel from "../../../infrastructure/models/Post";

// using jest.mock instead of const, because we going to use mock DB
jest.mock("../../../infrastructure/repositories/LikeRepo");
jest.mock("../../../infrastructure/models/Post");

describe("Like Post function test", () => {
  test("should throw error if already liked", async () => {
    jest.clearAllMocks();

    // Mock LikeRepo to simulate an existing like
    // jest.fn() -> making fake function
    // mockImplementation -> Implementing whole class with mock
    // mockResolvedValue -> Value that fake function going to return
    (LikeRepo as jest.Mock).mockImplementation(() => ({
      findByUserAndPost: jest.fn().mockResolvedValue({
        _id: "like1",
        userId: "user1",
        postId: "post1",
      }),
      create: jest.fn(),
      delete: jest.fn(),
    }));

    // Expect likePost to throw "Already liked" error
    await expect(likePost("user1", "post1")).rejects.toThrow("Already liked");
  });

  test("should create like and increment count", async () => {
    jest.clearAllMocks();

    // Mock LikeRepo to simulate no existing like
    (LikeRepo as jest.Mock).mockImplementation(() => ({
      findByUserAndPost: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        _id: "like1",
        userId: "user1",
        postId: "post1",
      }),
      delete: jest.fn(),
    }));

    // Mock PostModel.findByIdAndUpdate
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    // Expect likePost to create like and increment count
    await expect(likePost("user1", "post1")).resolves.toBeUndefined();
  });
});

describe("Unlike Post function test", () => {
  test("should throw error if like not found", async () => {
    jest.clearAllMocks();

    // Mock LikeRepo to simulate no existing like
    (LikeRepo as jest.Mock).mockImplementation(() => ({
      findByUserAndPost: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      delete: jest.fn(),
    }));

    // Expect unlikePost to throw "Like not found" error
    await expect(unlikePost("user1", "post1")).rejects.toThrow(
      "Like not found",
    );
  });

  test("should delete like and decrement count", async () => {
    jest.clearAllMocks();

    // Mock LikeRepo to simulate an existing like
    (LikeRepo as jest.Mock).mockImplementation(() => ({
      findByUserAndPost: jest.fn().mockResolvedValue({
        _id: "like1",
        userId: "user1",
        postId: "post1",
      }),
      create: jest.fn(),
      delete: jest.fn().mockResolvedValue({}),
    }));

    // Mock PostModel.findByIdAndUpdate
    (PostModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({});

    // Expect unlikePost to complete without error
    await expect(unlikePost("user1", "post1")).resolves.toBeUndefined();
  });
});
