import { AccessLevel } from '@prisma/client';
import { UserInformation } from '@share/type';

export type Event = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description?: string;
  isOffline: boolean;
  location?: string;
  registrationTime: string | Date;
  startTime: string | Date;
  endTime: string | Date;
  isEnded: boolean;
  approvedStatus: -1 | 0 | 1;
  publicity: AccessLevel;
  publicParticipant: boolean;
  userId: string;
  hostInformation?: {
    id: string;
    userId: string;
    email: string;
    fullName: string;
  };
};

export type Job = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  companyImageUrl: string;
  title: string;
  description: string;
  companyName: string;
  position: string;
  job: string;
  website: string;
  address: string;
  startTime?: string | Date;
  expiredAt?: string | Date;
  isApproved: boolean;
  recruitmentOwnerInfo: UserInformation;
  recruitmentOwnerId: string;
  recruitmentOwnerInfoId: string;
  yearsOfExperience?: string;
  salary: string;
  type: string;
};

type ApplicationOwnerInfo = {
  fullName: string;
  email: string;
  phone: string | null;
};

export type JobApplierInfo = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  resumeUrl: string;
  recruitmentId: string;
  applicationOwnerId: string;
  applicationOwnerInfo: ApplicationOwnerInfo;
  recruitment: Job;
};

export type JobInterest = {
  id: string;
  userId: string;
  eventId: string;
};

export type GetAdminJobListParams = {
  page: number;
  limit: number;
  approved: number | undefined;
};

export type GetUserAppliedJobListParams = {
  page: number;
  limit: number;
};

export type GetCandiatesAppliedJobListParams = {
  page: number;
  limit: number;
};

export type GetOwnerJobListParams = {
  page: number;
  limit: number;
};

export type GetOwnerGoingJobListParams = {
  page: number;
  limit: number;
};

export type GetOwnerInterestJobListParams = {
  page: number;
  limit: number;
};

export type GetPublicJobListParams = {
  page: number;
  limit: number;
};

export type GetPublicJobApplierInfoListParams = {
  page: number;
  limit: number;
  jobId?: string | null;
};

//BE
export type CreateRecruitmentProps = {
  companyName: string;
  companyImageUrl?: string;
  website?: string;
  job: string;
  address: string;
  position: string;
  title: string;
  description?: string;
  type?: string; // parttime, full time, etc ..
  salary: string;
  startAt?: string | null;
  expiredAt?: string | null;
  yearsOfExperience?: string | null;
};

export type UpdateRecruitmentProps = {
  companyName?: string;
  companyImageUrl?: string;
  website?: string;
  job?: string;
  address?: string;
  position?: string;
  title?: string;
  description?: string;
  type?: string; // parttime, full time, etc ..
  salary?: string;
  startAt?: string;
  expiredAt?: string;
};

export type GetListRecruitmentParams = {
  page: number;
  limit: number;
  companyName?: string;
  job?: string;
  position?: string;
  type?: string;
  salary?: string;
};

export type UpdateApplication = { resumeUrl?: string };
