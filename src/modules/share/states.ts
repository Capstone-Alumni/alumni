import { atom, atomFamily, selector } from 'recoil';
import { Class } from '../gradeAndClass/types';

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
};

export const useApiDataAtomFamily = atomFamily<unknown, string>({
  key: 'useApiDataAtom',
  default: null,
});

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

export type UserInformation = {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  alumClass?: Class;
  alumClassId?: string;
  avatarUrl?: string;
};

export const currentUserInformationDataAtom = atom<UserInformation>({
  key: 'currentUserInformation',
  default: {
    id: '',
    userId: '',
    email: '',
    fullName: '',
  },
});
