import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Tenant = {
  name: string;
  logo?: string;
  description?: string;
  subdomain: string;
  tenantId: string;
  theme: string;
};

export interface CurrentTenantState {
  name: string;
  logo?: string;
  description?: string;
  subdomain: string;
  tenantId: string;
  theme: string;
}

const initialState: CurrentTenantState = {
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
      state.name = action.payload.name;
      state.logo = action.payload.logo;
      state.description = action.payload.description;
      state.subdomain = action.payload.subdomain;
      state.tenantId = action.payload.tenantId;
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
