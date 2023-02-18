/** ========================== FE ================================= */

export type News = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  newsCategories?: string[];
  isPublic: boolean;
  newsImageUrl?: string;
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
  commenterId: string;
  commenterInfo: CommenterInfor;
  commenterInfoId: string;
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
};

export type UpdateNewsProps = {
  title?: string;
  content?: string;
  newsImageUrl?: string;
};

export type GetListNewParams = {
  page: number;
  limit: number;
  title?: string;
  content?: string;
};
