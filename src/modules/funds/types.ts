import { AccessLevel } from '@prisma/client';

export type Fund = {
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
  targetBalance: number;
  currentBalance: number;
  balanceUpdated: number;
  approvedStatus: -1 | 0 | 1;
  publicity: AccessLevel;
  userId: string;
  hostInformation?: {
    id: string;
    userId: string;
    email: string;
    fullName: string;
  };
  fundSaved: FundSaved[];
  statementFile?: string;
};

export type FundSaved = {
  id: string;
  userId: string;
  FundId: string;
};

export type GetAdminFundListParams = {
  page: number;
  limit: number;
  approved: number | undefined;
};

export type GetOwnerFundListParams = {
  page: number;
  limit: number;
};

export type GetOwnerSavedFundListParams = {
  page: number;
  limit: number;
};

export type GetPublicFundListParams = {
  page: number;
  limit: number;
};
