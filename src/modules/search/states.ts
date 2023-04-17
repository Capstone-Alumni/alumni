import { GetProfileListParams } from './types';
import { atom } from 'recoil';
import { GetAdminProfileListData } from './hooks/useGetAdminProfileList';

export const getProfileListParamsAtom = atom<GetProfileListParams>({
  key: 'getProfileListParams',
  default: {
    page: 1,
    limit: 10,
    gradeId: 'all',
    classId: 'all',
  },
});

export const getAdminProfileListDataAtom = atom<GetAdminProfileListData | null>(
  {
    key: 'getAdminProfileListData',
    default: null,
  },
);
