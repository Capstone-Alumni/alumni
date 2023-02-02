/** ========================== FE ================================= */

export type News = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
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
