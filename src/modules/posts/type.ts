import { AccessLevel } from '@prisma/client';
import { Information } from '../profiles/types';

export type PostLike = {
  id: string;
  authorId: string;
  postId: string;
};

export type PostComment = {
  id: string;
  authorId: string;
  postId: string;
  authorInformation: Information;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type Post = {
  id: string;
  content: string;
  publicity: AccessLevel;
  authorInformation: Information;
  postLikes: PostLike[];
  postComments: PostComment[];
  createdAt: string | Date;
  updatedAt: string | Date;
};
