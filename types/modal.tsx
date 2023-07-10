export interface ModalProps {
  isOpen: boolean;
  close: () => void;
  text: string;
  title: string;
  id: string;
  onCloseModal: () => void;
  posts: [];
  setPosts: (filteredPosts: []) => void;
}
