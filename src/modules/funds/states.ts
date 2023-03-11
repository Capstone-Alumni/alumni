import { atom } from 'recoil';
import {
  GetAdminFundListParams,
  GetFundTransactionListParams,
  GetOwnerFundListParams,
  GetOwnerSavedFundListParams,
  GetPublicFundListParams,
} from './types';

export const getAdminFundListParamsAtom = atom<GetAdminFundListParams>({
  key: 'getAdminFundListParams',
  default: {
    limit: 10,
    page: 1,
    approved: undefined,
  },
});

export const getOwnerFundListParamsAtom = atom<GetOwnerFundListParams>({
  key: 'getOwnerFundListParams',
  default: {
    limit: 12,
    page: 1,
  },
});

export const getPublicFundListParamsAtom = atom<GetPublicFundListParams>({
  key: 'getPublicFundListParams',
  default: {
    limit: 10,
    page: 1,
  },
});

export const getOwnerSavedFundListParamsAtom =
  atom<GetOwnerSavedFundListParams>({
    key: 'getOwnerInterestFundListParamsAtom',
    default: {
      limit: 10,
      page: 1,
    },
  });

export const getFundTransactionListParamsAtom =
  atom<GetFundTransactionListParams>({
    key: 'getFundTransactionListParams',
    default: {
      limit: 10,
      page: 1,
    },
  });
