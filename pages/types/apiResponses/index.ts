export type ApiSuccessResponse = {
  status: string;
  data: unknown | ItemsResponse;
};

export type ApiErrorResponse = {
  status: string;
  message: string;
};

export type ItemsResponse = {
  items: unknown[];
  totalItems: number;
  itemPage: number;
};
