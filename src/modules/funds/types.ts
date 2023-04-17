import { UserInformation } from '@share/states';

export type Fund = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  description?: string;
  backgroundImage?: string;
  startTime: string | Date;
  endTime: string | Date;
  targetBalance: number;
  currentBalance: number;
  hostId: string;
  host?: {
    id: string;
    information: UserInformation;
  };
  fundSaved: FundSaved[];
};

export type FundSaved = {
  id: string;
  saverId: string;
  fundId: string;
};

export type FundTransaction = {
  id: string;
  alumniId: string;
  alumni?: {
    id: string;
    information: UserInformation;
  };
  fundId: string;
  fund?: Fund;
  vnp_Amount: string | number;
  createdAt: string | Date;
  incognito: boolean;
};

export type FundReport = {
  id: string;
  archived: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  title: string;
  content: string;
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
