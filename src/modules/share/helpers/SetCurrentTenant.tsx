'use client';

import { currentTenantDataAtom, Tenant } from '@share/states';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const SetCurrentTenant = ({ tenantData }: { tenantData: Tenant }) => {
  const setCurrentTenantState = useSetRecoilState(currentTenantDataAtom);

  useEffect(() => {
    setCurrentTenantState(tenantData);
  }, []);

  return null;
};

export default SetCurrentTenant;
