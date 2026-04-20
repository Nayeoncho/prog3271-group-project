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
  const totalUsers = await UserModel.countDocuments();
  const totalPosts = await PostModel.countDocuments();
  const totalComments = await CommentModel.countDocuments();

  return {
    totalUsers,
    totalPosts,
    totalComments,
    totalLikes: 0, // likes model not implemented yet
  };
};
