import {
  AlumClass,
  Grade,
  Information as Infor,
  ScopePublicity,
} from '@prisma/client';
import { Class } from '../gradeAndClass/types';

export type Information = {
  id: string;
  alumniId: string;
  email: string | null;
  fullName: string;
  alumClass?: Class | null;
  avatarUrl?: string | null;

  phone?: string | null;
  phonePublicity: ScopePublicity;
  facebookUrl?: string | null;
  facebookPublicity: ScopePublicity;
  dateOfBirth?: string | Date | null;
  dateOfBirthPublicity: ScopePublicity;
};

export type GetInformationParams = {
  id: string;
};
export type UpdateInformationProps = {
  id: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  email: string;
  emailPublicity?: ScopePublicity;
  phone?: string;
  phonePublicity?: ScopePublicity;
  facebookUrl?: string;
  facebookPublicity?: ScopePublicity;
  dateOfBirth?: Date | string;
  dateOfBirthPublicity?: ScopePublicity;
};

export type GetInformationProps = {
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

export type QueryInformationProps = {
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

export type SendPingServiceProps = {
  message: string;
};

//carrers
export type GetCareerListServiceParams = {
  jobTitle: string;
  company: string;
  page: number;
  limit: number;
};

export type GetUsersInformationListServiceParams = {
  name: string;
  classId: string;
  gradeId: string;
  page: number;
  limit: number;
};

export type UpdateCareerInfoByIdServiceProps = {
  jobTitle?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
};

export type InformationIncludeClass = Infor & {
  alumClass:
    | (AlumClass & {
        grade: Grade;
      })
    | null;
};
