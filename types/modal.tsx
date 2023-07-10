import { PostProps } from "./posts";

export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  text: string;
  title: string;
  id: string;
  onCloseModal: () => void;
  posts: PostProps[];
  setPosts: (filteredPosts: []) => void;
}
