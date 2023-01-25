import { ScopePublicity } from '@prisma/client';

export type UpdateInformationProps = {
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  userEmail?: string;
  emailPublicity?: ScopePublicity;
  phone?: string;
  phonePublicity?: ScopePublicity;
  facebookUrl?: string;
  facebookPublicity?: ScopePublicity;
  dateOfBirth?: Date | string;
  dateOfBirthPublicity?: ScopePublicity;
};

export type CreateOrUpdateEducationServiceProps = {
  school: string;
  degree?: string;
  startDate?: Date;
  endDate?: Date;
};

export type QueryParamGetEducationByUserId = {
  school: string;
  degree?: string;
  startDate?: Date;
  endDate?: Date;
  page?: string;
  limit?: string;
};
//carrers
export type CreateCareerServiceProps = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
};

export type GetCareerListServiceParams = {
  jobTitle: string;
  company: string;
  page: number;
  limit: number;
};

export type UpdateCareerInfoByIdServiceProps = {
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};