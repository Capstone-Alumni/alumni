import { atom } from 'recoil';
import { GetClassListParams, GetGradeListParams } from './types';

export const getGradeListParamsAtom = atom<GetGradeListParams>({
  key: 'getGradeListParams',
  default: {
    page: 1,
    limit: 10,
    name: '',
    code: '',
  },
});

export const getClassListParamsAtom = atom<GetClassListParams>({
  key: 'getClassListParams',
  default: {
    limit: 999,
    name: '',
    page: 1,
  },
});
