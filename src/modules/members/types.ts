export type ACCESS_LEVEL =
  | 'SCHOOL_ADMIN'
  | 'CLASS_MOD'
  | 'GRADE_MOD'
  | 'ALUMNI';
export type ACCESS_STATUS = 'PENDING' | 'APPROVED';

/** ========================== FE ================================= */
export type Member = {
  id: string;
  userId: string;
  tenantId: string;
  accessLevel: ACCESS_LEVEL;
  accessStatus: ACCESS_STATUS;

  isOwner: boolean;

  user: {
    id: string;
    email: string;
  };
};

export type GetMemberListParams = {
  page?: number;
  limit?: number;
  email?: string;
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
  email: string;
};

export type GetMemberListServiceProps = {
  tenantId: string;
  params: GetMemberListServiceParams;
};

export type CreateMemberServiceProps = {
  email: string;
  password: string;
  tenantId: string;
};

export type UpdateMemberInfoByIdServiceProps = {
  password?: string;
};