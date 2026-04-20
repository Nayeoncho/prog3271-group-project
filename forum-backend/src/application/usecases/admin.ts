import UserModel from "../../infrastructure/models/User";
import PostModel from "../../infrastructure/models/Post";
import CommentModel from "../../infrastructure/models/Comment";

interface AdminStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  // Implement get total users query
  const totalUsers = await UserModel.countDocuments();
  // Implement get total posts query
  const totalPosts = await PostModel.countDocuments();
  // Implement get total comments query
  const totalComments = await CommentModel.countDocuments();
  // Implement get total likes query
  const totalLikes = 0;

  return {
    totalUsers,
    totalPosts,
    totalComments,
    totalLikes, // likes model not implemented yet
  };
};
