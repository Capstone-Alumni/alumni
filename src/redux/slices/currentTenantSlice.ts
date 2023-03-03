import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
};

export interface CurrentTenantState {
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
}

const initialState: CurrentTenantState = {
  id: '',
  name: 'Alumni',
  logo: '/logo.png',
  description: '',
  subdomain: '',
  tenantId: '',
  theme: 'green',
};

const currentTenantSlice = createSlice({
  name: 'currentTenant',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.logo = action.payload.logo;
      state.description = action.payload.description;
      state.subdomain = action.payload.subdomain;
      state.tenantId = action.payload.tenantId;
      state.background1 = action.payload.background1;
    },
  },
});

export const { setTenant } = currentTenantSlice.actions;

export const currentTenantSelector = (state: RootState) => state.currentTenant;

export const currentTenantSubdomainSelector = (state: RootState) =>
  state.currentTenant.subdomain;

export const currentTenantThemeSelector = (state: RootState) =>
  state.currentTenant.theme;

export default currentTenantSlice.reducer;
