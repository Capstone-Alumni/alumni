import { atom } from 'recoil';
import {
  GetAdminJobListParams,
  GetOwnerGoingJobListParams,
  GetOwnerInterestJobListParams,
  GetOwnerJobListParams,
  GetPublicJobApplierInfoListParams,
  GetPublicJobListParams,
} from './types';

export const getAdminJobListParamsAtom = atom<GetAdminJobListParams>({
  key: 'getAdminJobListParams',
  default: {
    limit: 10,
    page: 1,
    approved: undefined,
  },
});

export const getOwnerJobListParamsAtom = atom<GetOwnerJobListParams>({
  key: 'getOwnerJobListParams',
  default: {
    limit: 12,
    page: 1,
  },
});

export const getPublicJobListParamsAtom = atom<GetPublicJobListParams>({
  key: 'getPublicJobListParams',
  default: {
    limit: 10,
    page: 1,
  },
});

export const getPublicJobApplierInfoListParamsAtom =
  atom<GetPublicJobApplierInfoListParams>({
    key: 'getPublicJobApplierInfoListParams',
    default: {
      limit: 10,
      page: 1,
      jobId: null,
    },
  });

export const getOwnerGoingJobListParamsAtom = atom<GetOwnerGoingJobListParams>({
  key: 'getOwnerGoingJobListParamsAtom',
  default: {
    limit: 10,
    page: 1,
  },
});

export const getOwnerInterestJobListParamsAtom =
  atom<GetOwnerInterestJobListParams>({
    key: 'getOwnerInterestJobListParamsAtom',
    default: {
      limit: 10,
      page: 1,
    },
  });
