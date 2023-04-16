/** ========================== FE ================================= */

export type News = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  tagsNews?: TagsNews[];
  isPublic: boolean;
  newsImageUrl?: string;
  authorId?: string;
  author?: {
    id: string;
    information: AuthorInfo;
  };
};

export type TagsNews = {
  id: string;
  tagName: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
};

type AuthorInfo = {
  id: string;
  fullName?: string;
  avatarUrl?: string;
};

export type GetNewsListDataParams = {
  page?: number;
  limit?: number;
  title?: string;
  content?: string;
};

export type GetNewsListData = {
  items: News[];
  totalItems: number;
  itemPerPage: number;
};

export type GetListNewComment = {
  page?: number;
  limit?: number;
};

export type CreateOrUpdateNewComment = {
  commentContent: string;
};

type CommenterInfor = {
  id: string;
  fullName: string;
  avatarUrl: string;
};

export type NewsComment = {
  archived: boolean;
  commentContent: string;
  commenterId?: string;
  commenter?: {
    id: string;
    information: CommenterInfor;
  };
  createdAt: string;
  id: string;
  newsId: string;
  updatedAt: string;
};
/** ========================== BE ================================= */

export type CreateNewsProps = {
  title: string;
  content: string;
  newsImageUrl?: string;
  tagsNews?: string[];
};

export type UpdateNewsProps = {
  title?: string;
  content?: string;
  newsImageUrl?: string;
  tagsNews?: string[];
};

export type GetListNewParams = {
  page: number;
  limit: number;
  title?: string;
  content?: string;
};
