/** ========================== FE ================================= */
export type Grade = {
  id: string;
  code: string;
  createdAt: string | Date;
  startYear: number | string;
  endYear: number | string;
  _count?: {
    alumClasses: number;
  };
  alumClasses?: Class[];
};

export type Class = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string | Date;
  gradeId: string;
  grade?: Grade;
};

export type GetGradeListData = {
  items: Grade[];
  totalItems: number;
  itemPerPage: number;
};

export type GetGradeListParams = {
  page?: number;
  limit?: number;
  code?: string;
  name?: string;
};

export type GetClassListData = {
  items: Class[];
  totalItems: number;
  itemPerPage: number;
};

export type GetClassListParams = {
  page?: number;
  limit?: number;
  name?: string;
};

/** ========================== BE ================================= */

// grades
export type GetGradeListServiceParams = {
  page: number;
  limit: number;
  code: string;
};

export type GetGradeListServiceProps = {
  params: GetGradeListServiceParams;
};

export type CreateGradeServiceProps = {
  code: string;
  startYear: string;
  endYear: string;
};

export type UpdateGradeInfoByIdServiceProps = {
  code?: string;
  startYear?: string;
  endYear?: string;
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
