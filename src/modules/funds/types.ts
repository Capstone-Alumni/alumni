import { AccessLevel } from '@prisma/client';
import { UserInformation } from '@share/states';

export type Fund = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description?: string;
  startTime: string | Date;
  endTime: string | Date;
  targetBalance: number;
  currentBalance: number;
  publicity: AccessLevel;
  userId: string;
  hostInformation?: UserInformation;
  fundSaved: FundSaved[];
};

export type FundSaved = {
  id: string;
  userId: string;
  FundId: string;
};

export type FundTransaction = {
  id: string;
  userId: string;
  userInformation?: UserInformation;
  fundId: string;
  fund?: Fund;
  vnp_Amount: string | number;
  createdAt: string | Date;
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
  status: 'ended' | 'going';
};

export type GetFundTransactionListParams = {
  page: number;
  limit: number;
};
