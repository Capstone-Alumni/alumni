/** ========================== FE ================================= */
export type Grade = {
  id: string;
  code: string;
  name?: string;
  createdAt: string;
};

export type Class = {
  id: string;
  name?: string;
  description: string | null;
  createdAt: string;
};

/** ========================== BE ================================= */

// grades
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

// classes
export type CreateClassServiceProps = {
  name: string;
  gradeId: string;
};

export type GetClassListServiceParams = {
  page: number;
  limit: number;
  name: string;
};

export type GetClassListServiceProps = {
  gradeId: string;
  params: GetClassListServiceParams;
};

export type UpdateClassInfoByIdServiceProps = {
  name?: string;
  description?: string;
};
