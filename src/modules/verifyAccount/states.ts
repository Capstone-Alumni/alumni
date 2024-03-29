import { GetAccessRequestListParams } from './types';
import { atom } from 'recoil';
import { Class, Grade } from '../gradeAndClass/types';

export const selectedGradeAtom = atom<Grade | null>({
  key: 'selectedGradeVerifyAccountAtom',
  default: null,
});

export const selectedClassAtom = atom<Class | null>({
  key: 'selectedClassAtom',
  default: null,
});

export const getAccessRequestListParamsAtom = atom<GetAccessRequestListParams>({
  key: 'getAccessRequestParams',
  default: {
    page: 1,
    limit: 20,
    name: '',
  },
});
