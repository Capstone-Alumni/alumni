import { atom } from 'recoil';
import {
  GetAdminJobListParams,
  GetOwnerJobListParams,
  GetOwnerGoingJobListParams,
  GetOwnerInterestJobListParams,
  GetPublicJobListParams,
  GetPublicJobParticipantListParams,
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

export const getPublicJobParticipantListParamsAtom =
  atom<GetPublicJobParticipantListParams>({
    key: 'getPublicJobParticipantListParams',
    default: {
      limit: 10,
      page: 1,
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
