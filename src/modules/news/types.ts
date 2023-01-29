export type CreateContentProps = {
  title: string;
  content: string;
};

export type UpdateContentProps = {
  title?: string;
  content?: string;
};

export type GetListNewParams = {
  page: number;
  limit: number;
  title?: string;
  content?: string;
};
