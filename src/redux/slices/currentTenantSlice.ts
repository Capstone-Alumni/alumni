import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type Tenant = {
  subdomain: string;
  tenantId: string;
};

export interface CurrentTenantState {
  subdomain: string;
  tenantId: string;
}

const initialState: CurrentTenantState = {
  subdomain: '',
  tenantId: '',
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

export default currentTenantSlice.reducer;
