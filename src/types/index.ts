export type UserRole = 'reader' | 'publisher';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publisherId: string;
  coverImage: string;
  description: string;
  genre: string[];
  publishedDate: string;
  rating: number;
  reviews: Review[];
  isFeatured?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}