export interface ParamsPost {
  params: {
    postId?: string;
    userId?: string;
  };
}

export interface Comment {
  userImage: string;
  userName: string;
  content: string;
}

export interface Creator {
  _id: string;
  image: string;
  first_name: string;
  last_name: string;
}

export interface PostProps {
  _id: string;
  hashtags: string;
  description: string;
  image: string;
  createdAt: string;
  location: string;
  firstName: string;
  lastName: string;
  creatorImg: string;
  userId: string;
  likes: {}[];
  creator: Creator;
  comments: Comment[];
  show: boolean;
}

export interface PostFormTypes {
  location: string;
  hashtags: string;
  description: string;
  image: string;
  userId: string;
}
