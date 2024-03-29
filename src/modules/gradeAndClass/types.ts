import { Information } from '../profiles/types';

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
  gradeMod: Array<{
    id: string;
    alumni: {
      id: string;
      information: Information;
    };
  }>;
};

export type Class = {
  id: string;
  name: string;
  createdAt: string | Date;
  gradeId: string;
  grade?: Grade;
  _count?: {
    alumniToClass: number;
  };
  alumniToClass?: Array<{
    id: string;
    isClassMod: boolean;
    alumni: {
      id: string;
      information: Information;
    };
  }>;
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
  alumniId?: string;
  isAdminMode?: boolean;
};

export type GetAdminGradeListParams = {
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
  alumniId?: string;
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
