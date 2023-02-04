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

/** ========================== BE ================================= */

export type CreateNewsProps = {
  title: string;
  content: string;
};

export type UpdateNewsProps = {
  title?: string;
  content?: string;
};

export type GetListNewParams = {
  page: number;
  limit: number;
  title?: string;
  content?: string;
};
