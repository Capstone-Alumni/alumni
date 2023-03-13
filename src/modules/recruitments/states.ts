import { atom } from 'recoil';
import {
  GetAdminJobListParams,
  GetCandiatesAppliedJobListParams,
  GetOwnerGoingJobListParams,
  GetOwnerInterestJobListParams,
  GetOwnerJobListParams,
  GetPublicJobApplierInfoListParams,
  GetPublicJobListParams,
  GetUserAppliedJobListParams,
} from './types';

export const getAdminJobListParamsAtom = atom<GetAdminJobListParams>({
  key: 'getAdminJobListParams',
  default: {
    limit: 10,
    page: 1,
    approved: undefined,
  },
});

export const getUserGetAppliedJobListParamsAtom =
  atom<GetUserAppliedJobListParams>({
    key: 'getUserGetAppliedJobListParams',
    default: {
      limit: 10,
      page: 1,
    },
  });

export const getCandiatesAppliedJobListParamsAtom =
  atom<GetCandiatesAppliedJobListParams>({
    key: 'getCandiatesAppliedJobListParams',
    default: {
      limit: 10,
      page: 1,
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
