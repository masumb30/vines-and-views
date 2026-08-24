export interface PopulatedUser {
  _id: string;
  name: string;
  email?: string;
  image?: string;
}

export interface PopulatedComment {
  _id: string;
  postId: string;
  userId: PopulatedUser;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface PopulatedPost {
  _id: string;
  userId: PopulatedUser;
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  likes: PopulatedUser[];
  comments: PopulatedComment[];
  createdAt: string;
  updatedAt: string;
}