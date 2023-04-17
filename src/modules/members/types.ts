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
  accountId?: string | null;
  tenantId: string;

  information: Information | null;

  alumniToClass: Array<{
    alumClassId: string;
    alumClass: Class;
  }>;
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
    grade: Array<{ id: string; value: string; label: string }>;
    alumClass: Array<{ id: string; value: string; label: string }>;
  }>;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  facebook?: string;
  tenantId: string;
};

export type UpdateMemberInfoByIdServiceProps = {
  password?: string;
};
