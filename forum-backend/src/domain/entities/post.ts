export interface PostEntity {
  _id?: string;
  title: string;
  content: string;
  authorId: string;
  authorName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likeCount?: number;
}
