import { GetProfileListParams } from './types';
import { atom } from 'recoil';

export const getProfileListParamsAtom = atom<GetProfileListParams>({
  key: 'getProfileListParams',
  default: {
    page: 1,
    limit: 10,
  },
});
