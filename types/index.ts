import { IconType } from "react-icons";
export interface SidebarItemProps {
  key?: string;
  href?: string;
  icon: IconType;
  label: string;
  onClick?: () => void;
  alert?: boolean | null;
}

export interface HeaderProps {
  label: string | undefined;
  showBackArrow?: boolean;
}

export interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

export interface AvatarProps {
  userId: string | undefined;
  username?: string;
  hasBorder?: boolean;
  isLarge?: boolean;
  profileImage?: string | null;
}

export interface User {
  id: string;
  name: string;
  username: string;
  bio: null | string;
  email: string;
  emailVerified: null | string;
  image: null | string;
  coverImage: null | string;
  profileImage: null | string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  followingIds: [] | null;
  followerIds: [] | null;
  hasNotification: null | boolean;
}
export interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

export interface IComment {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  useId: string;
  postId: string;
}

export interface IPost {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  likedIds?: Array<string>;
  image?: string;
  user: User;
  comments: IComment[];
}

export interface IComment {
  id: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  postId: string;
  username: String;
  name: string;
  profileUrl?: string;
}
export interface PostItemProps {
  key?: string;
  userId?: string;
  data: IPost;
  handleLike?: () => void;
  comments?: IComment[];
}

export interface IDecodedToken {
  _id: string;
  iat: number;
}
