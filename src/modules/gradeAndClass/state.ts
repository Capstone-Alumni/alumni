import { atom } from 'recoil';
import {
  GetAdminGradeListParams,
  GetClassListParams,
  GetGradeListParams,
  Grade,
} from './types';

export const getGradeListParamsAtom = atom<GetGradeListParams>({
  key: 'getGradeListParams',
  default: {
    page: 1,
    limit: 10,
    name: '',
    code: '',
    alumniId: '',
    isAdminMode: false,
  },
});

export const getAdminGradeListParamsAtom = atom<GetAdminGradeListParams>({
  key: 'getAdminGradeListParams',
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
    limit: 10,
    name: '',
    page: 1,
  },
});

export const selectedGradeAtom = atom<Grade | null>({
  key: 'selectedGradeAtom',
  default: null,
});
