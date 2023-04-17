import { UserInformation } from '@share/type';
import { Class, Grade } from '../gradeAndClass/types';

export type PostLike = {
  id: string;
  authorId: string;
  postId: string;
};

export type PostComment = {
  id: string;
  authorId: string;
  postId: string;
  author: {
    id: string;
    information: UserInformation;
  };
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type Post = {
  id: string;
  content: string;
  author: {
    id: string;
    information: UserInformation;
  };
  grade?: Grade;
  alumClass?: Class;
  isPublicSchool?: boolean;
  postLikes: PostLike[];
  postComments: PostComment[];
  createdAt: string | Date;
  updatedAt: string | Date;
};
