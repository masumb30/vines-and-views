// 
export interface IMongoRecord {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUserBase {
    name: string;
    email: string;
    image?: string;
}

export interface IUser extends IUserBase, IMongoRecord { }



export interface IPostBase {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
}

export interface IPost extends IMongoRecord {
    userId: string | IUser;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    likes: string[] | IUser[];
    comments: string[] | IComment[];
}

export interface ICommentBase {
    postId: string;
    userId: string;
    content: string;
}

export interface IComment extends IMongoRecord {
    postId: string | IPost;
    userId: string | IUser;
    content: string;
}