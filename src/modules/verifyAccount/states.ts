import { GetAccessRequestListParams } from './types';
import { atom } from 'recoil';
import { Class, Grade } from '../gradeAndClass/types';

export const selectedGradeAtom = atom<Grade | null>({
  key: 'selectedGradeAtom',
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
    limit: 99,
  },
});
