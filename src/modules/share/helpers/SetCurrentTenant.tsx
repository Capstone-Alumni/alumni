'use client';

import { useAppDispatch } from '@redux/hooks';
import { setTenant, Tenant } from '@redux/slices/currentTenantSlice';

const SetCurrentTenant = ({ tenantData }: { tenantData: Tenant }) => {
  const dispatch = useAppDispatch();

  dispatch(setTenant(tenantData));

  return null;
};

export default SetCurrentTenant;
