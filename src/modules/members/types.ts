import { Class } from '../gradeAndClass/types';
import { Information } from '../profiles/types';

export type ACCESS_LEVEL =
  | 'SCHOOL_ADMIN'
  | 'CLASS_MOD'
  | 'GRADE_MOD'
  | 'ALUMNI';
export type ACCESS_STATUS = 'PENDING' | 'APPROVED';

/** ========================== FE ================================= */
export type Member = {
  id: string;
  tenantId: string;
  lastLogin?: string;

  information: Information | null;

  alumniToClass: AlumniToClass[];
  createdAt: string;
};

export type AlumniToClass = {
  alumClassId: string;
  alumClass: Class;
};

export type GetMemberListParams = {
  page?: number;
  limit?: number;
  name?: string;
};

export type GetMemberListData = {
  items: Member[];
  totalItems: number;
  itemPerPage: number;
};

/** ========================== BE ================================= */

export type GetMemberListServiceParams = {
  page: number;
  limit: number;
  name: string;
  excludeGradeId: string;
  excludeClassId: string;
};

export type GetMemberListServiceProps = GetMemberListServiceParams;

export type CreateMemberServiceProps = {
  fullName: string;
  gradeClass: Array<{
    grade: { id: string; value: string; label: string };
    alumClass: { id: string; value: string; label: string };
  }>;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  facebook?: string;
  tenantId: string;
  alumniId: string;
};

export type CreateManyMemberServiceProps = {
  fullName: string;
  gradeClass: Array<{
    alumClass: Array<{ id: string; value: string; label: string }>;
  }>;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  facebook?: string;
  tenantId: string;
  alumniId: string;
}[];

export type UpdateMemberInfoByIdServiceProps = {
  password?: string;
};
