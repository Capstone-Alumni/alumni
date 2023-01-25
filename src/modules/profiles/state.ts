import { atom } from 'recoil';
import { GetInformationParams } from './types';

export const getUserInformationParamsAtom = atom<GetInformationParams>({
  key: 'getUserInformationParams',
  default: {
    id: "123"
  },
});

