import { Class } from '../gradeAndClass/types';

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
  alumniId?: string;
  name?: string;
};

export type AccessRequest = {
  id: string;
  alumClassId: string;
  alumClass?: Class;
  alumniId?: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date | string;
  requestStatus: number;
  createdAt: string;
  password?: string;
};
