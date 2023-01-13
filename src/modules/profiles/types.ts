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

//carrers
export type CreateCareerServiceProps = {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
};

export type GetCareerListServiceParams = {
  jobTitle: string;
  page: number;
  limit: number;
};

export type UpdateCareerInfoByIdServiceProps = {
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};
