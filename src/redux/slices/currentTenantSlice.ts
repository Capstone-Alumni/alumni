import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Tenant = {
  subdomain: string;
  tenantId: string;
  theme: string;
};

export interface CurrentTenantState {
  subdomain: string;
  tenantId: string;
  theme: string;
}

const initialState: CurrentTenantState = {
  subdomain: '',
  tenantId: '',
  theme: 'green',
};

const currentTenantSlice = createSlice({
  name: 'currentTenant',
  initialState,
  reducers: {
    setTenant: (state, action: PayloadAction<Tenant>) => {
      state.subdomain = action.payload.subdomain;
      state.tenantId = action.payload.tenantId;
    },
  },
});

export const { setTenant } = currentTenantSlice.actions;

export const currentTenantSubdomainSelector = (state: RootState) =>
  state.currentTenant.subdomain;

export const currentTenantThemeSelector = (state: RootState) =>
  state.currentTenant.theme;

export default currentTenantSlice.reducer;
