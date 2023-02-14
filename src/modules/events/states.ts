import { atom } from 'recoil';
import {
  GetAdminEventListParams,
  GetOwnerEventListParams,
  GetPublicEventListParams,
} from './types';

export const getAdminEventListParamsAtom = atom<GetAdminEventListParams>({
  key: 'getAdminEventListParams',
  default: {
    limit: 10,
    page: 1,
    archived: false,
    approved: false,
  },
});

export const getOwnerEventListParamsAtom = atom<GetOwnerEventListParams>({
  key: 'getOwnerEventListParams',
  default: {
    limit: 10,
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
