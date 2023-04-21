import { atom } from 'recoil';
import { GetAdminReportListParams } from './types';

export const getAdminReportListParamsAtom = atom<GetAdminReportListParams>({
  key: 'getAdminReportListParams',
  default: {
    limit: 10,
    page: 1,
  },
});
