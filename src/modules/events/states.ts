import { atom } from 'recoil';
import {
  GetAdminEventListParams,
  GetOwnerEventListParams,
  GetOwnerGoingEventListParams,
  GetPublicEventListParams,
  GetPublicEventParticipantListParams,
} from './types';

export const getAdminEventListParamsAtom = atom<GetAdminEventListParams>({
  key: 'getAdminEventListParams',
  default: {
    limit: 10,
    page: 1,
    approved: undefined,
  },
});

export const getOwnerEventListParamsAtom = atom<GetOwnerEventListParams>({
  key: 'getOwnerEventListParams',
  default: {
    limit: 12,
    page: 1,
  },
});

export const getPublicEventListParamsAtom = atom<GetPublicEventListParams>({
  key: 'getPublicEventListParams',
  default: {
    limit: 10,
    page: 1,
  },
});

export const getPublicEventParticipantListParamsAtom =
  atom<GetPublicEventParticipantListParams>({
    key: 'getPublicEventParticipantListParams',
    default: {
      limit: 10,
      page: 1,
    },
  });

export const getOwnerGoingEventListParamsAtom =
  atom<GetOwnerGoingEventListParams>({
    key: 'getOwnerGoingEventListParamsAtom',
    default: {
      limit: 10,
      page: 1,
    },
  });

export const getOwnerInterestEventListParamsAtom =
  atom<GetOwnerGoingEventListParams>({
    key: 'getOwnerInterestEventListParamsAtom',
    default: {
      limit: 10,
      page: 1,
    },
  });
