import { PostProps } from "../posts";

export interface UserSignupData {
  first_name: string;
  last_name: string;
  email: string;
  biography: string;
  password: string | number;
  image: string;
}

export interface UserLoginData {
  email: string;
  password: string | number;
}

export interface AuthLoginProps {
  classes: any;
  onLoginSubmit: (data: UserLoginData) => void;
}

export interface AuthSignupProps {
  classes: any;
  onSubmitSignup: (data: UserSignupData) => void;
}

export interface SearchResultProps {
  _id: string;
  first_name: string;
  image?: string;
  last_name: string;
}

export interface User {
  isPrivate: boolean;
  userImage: string;
  firstName: string;
  lastName: string;
  email: string;
  posts: PostProps[];
  biography: string;
  followers: number;
  following: number;
  wideImage: string;
  followUser: () => void;
  isUserFollowed: boolean;
  isSended: boolean;
}
