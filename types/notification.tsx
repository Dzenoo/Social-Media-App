export interface NotificationProps {
  _id: string;
  message: string;
  image: string;
  date: Date;
}

export interface NotificationItemProps {
  title: string;
  time: string & Date;
  image: string;
  showImage?: boolean;
  onAccept?: () => void;
  showButtons?: boolean;
}
