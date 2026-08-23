export interface IMongoRecord {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserBase {
    name: string;
    email: string;
    image?: string;
    avatar?: string;
}

export interface IUser extends IUserBase, IMongoRecord { }

export interface IPost extends IMongoRecord {
    userId?: string | IUser;
    authorId?: string | IUser;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    likes: string[] | IUser[];
    comments: string[] | IComment[];
    summary: string;
}

export interface IComment extends IMongoRecord {
    postId: string | IPost;
    userId: string | IUser;
    content: string;
}

export interface ApiResponse {
    totalPages: number;
    currentPage: number;
    data: IPost[];
}