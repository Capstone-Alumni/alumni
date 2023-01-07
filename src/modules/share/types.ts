export type GetGradeListServiceParams = {
  page: number;
  limit: number;
  name: string;
  code: string;
};

export type GetGradeListServiceProps = {
  params: GetGradeListServiceParams;
};

export type CreateGradeServiceProps = {
  name: string;
  code: string;
};

export type UpdateGradeInfoByIdServiceProps = {
  name?: string;
  code?: string;
};
