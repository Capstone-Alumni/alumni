import { atom, atomFamily, RecoilState, selector } from 'recoil';
import { Class, Grade } from '../gradeAndClass/types';

export type Plan = {
  id: string;
  name: string;
  duration: string | number;
  price: string | number;
};

export type Tenant = {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  subdomain: string;
  tenantId: string;
  theme: string;
  background1?: string;
  background2?: string;
  background3?: string;
  vnp_tmnCode?: string;
  vnp_hashSecret?: string;
  subscriptionEndTime?: string | Date;
  planId?: string;
  plan?: Plan | null;
  address?: string;
  provinceCodename?: string;
  provinceName?: string;
  cityCodename?: string;
  cityName?: string;
};

export type UserInformation = {
  id: string;
  alumniId: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  ping: any[];
};

export type Alumni = {
  id: string;
  tenantId: string;

  information?: UserInformation;
  alumniToClass?: Array<{
    id: string;
    isClassMod: boolean;
    alumClass: Class;
    alumClassId: string;
  }>;
  gradeMod?: Array<{
    id: string;
    gradeId: string;
    grade: Grade;
  }>;
  pingSent?: Array<any>;
  pingReceived?: Array<any>;
  isOwner: boolean;
};

export const _useApiDataAtomFamily = atomFamily<any, string>({
  key: 'useApiDataAtom',
  default: null,
});

export const useApiDataAtomFamily = <T>(id: string): RecoilState<T> => {
  return _useApiDataAtomFamily(id);
};

export const currentTenantDataAtom = atom<Tenant>({
  key: 'currentTenant',
  default: {
    id: '',
    name: '',
    subdomain: '',
    tenantId: '',
    theme: 'green',
  },
});

export const currentTenantSubdomainSelector = selector({
  key: 'currentTenantSubdomain',
  get: ({ get }) => {
    const tenant = get(currentTenantDataAtom);
    return tenant?.subdomain;
  },
});

export const currentTenantThemeSelector = selector({
  key: 'currentTenantTheme',
  get: ({ get }) => {
    const tenant = get(currentTenantDataAtom);
    return tenant?.theme;
  },
});

export const currentUserInformationDataAtom = atom<Alumni | null>({
  key: 'currentUserInformation',
  default: null,
});
