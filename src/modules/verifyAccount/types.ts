export type VerifyAccountInfoServiceProps = {
  userId: string;
  accessLevel: string;
  fullName: string;
  email: string;
  classId: string;
  gradeId: string;
};

export type GetAccessRequestListParams = {
  page?: number;
  limit?: number;
};

export type AccessRequest = {
  id: string;
  userId: string;
  alumClassId: string;
  gradeId: string;
  fullName: string;
  createdAt: string;
};
