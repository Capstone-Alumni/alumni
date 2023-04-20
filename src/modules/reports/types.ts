import { AccessLevel } from '@prisma/client';
import { UserInformation } from '@share/type';

export type Report = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  fullName: string;
  email: string;
  response?: string;
  message: string;
};

type ApplicationOwnerInfo = {
  fullName: string;
  email: string;
  phone: string | null;
};

export type ReportApplierInfo = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  resumeUrl: string;
  recruitmentId: string;
  applicationOwnerId: string;
  applicationOwner: {
    id: string;
    information: ApplicationOwnerInfo;
  };
  recruitment: Report;
};

export type ReportInterest = {
  id: string;
  userId: string;
  eventId: string;
};

export type GetAdminReportListParams = {
  page: number;
  limit: number;
};

export type GetUserAppliedReportListParams = {
  page: number;
  limit: number;
};

export type GetCandiatesAppliedReportListParams = {
  page: number;
  limit: number;
};

export type GetOwnerReportListParams = {
  page: number;
  limit: number;
};

export type GetOwnerGoingReportListParams = {
  page: number;
  limit: number;
};

export type GetOwnerInterestReportListParams = {
  page: number;
  limit: number;
};

export type GetPublicReportListParams = {
  page: number;
  limit: number;
};

export type GetPublicReportApplierInfoListParams = {
  page: number;
  limit: number;
  ReportId?: string | null;
};

//BE
export type CreateReportProps = {
  email: string;
  fullName: string;
  message: string;
};

export type UpdateReportProps = {
  response: string;
};

export type GetListReportParams = {
  page: number;
  limit: number;
};

export type UpdateApplication = { resumeUrl?: string };
