'use client';

import { useAppDispatch } from 'src/redux/hooks';
import { setTenant, Tenant } from 'src/redux/slices/currentTenantSlice';

const SetCurrentTenant = ({ tenantData }: { tenantData: Tenant }) => {
  const dispatch = useAppDispatch();

  dispatch(setTenant(tenantData));

  return null;
};

export default SetCurrentTenant;
