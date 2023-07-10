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
  isPrivate: boolean;
}

export interface Post {
  firstName: string;
  lastName: string;
  creatorImg: string;
  description: string;
  image: string;
  date: string | Date;
  hashtags: string;
  location: string;
  userId: string;
  postId: string;
  likes: {}[];
  comments: Comment[];
  show: boolean;
}

export interface PostProps {
  _id: string;
  hashtags: string;
  description: string;
  image: string;
  createdAt: string;
  location: string;
  likes: {}[];
  creator: Creator;
  comments: Comment[];
}

export interface PostFormTypes {
  location: string;
  hashtags: string;
  description: string;
  image: string;
  userId: string;
}

export interface Comment {
  userImage: string;
  userName: string;
  content: string;
}

export interface CommentProps {
  userImg: string;
  setComment: (value: string) => void;
  comment: string;
  userName: string;
  postId: string;
  comments: Comment[];
  isLoading: boolean;
  setisLoading: (value: boolean) => void;
}

export interface PostData {
  location: string;
  hashtags: string;
  description: string;
  image: string;
  userId: string;
}
export interface PostForm {
  onSubmitPost: (data: PostData) => void;
}

export interface SavedPost {
  image: string;
  postId: string;
}

export interface PostItemDashboard {
  openDeleteModal: () => void;
  description: string;
  likes: number;
  comments: number;
  date: string;
  id: string;
  image: string;
  hashtags: string;
  show: boolean;
}
