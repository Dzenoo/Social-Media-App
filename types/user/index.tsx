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
