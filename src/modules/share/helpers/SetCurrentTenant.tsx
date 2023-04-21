'use client';

import { currentTenantDataAtom, Tenant } from '@share/states';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const SetCurrentTenant = ({ tenantData }: { tenantData: Tenant }) => {
  const [currentTenant, setCurrentTenantState] = useRecoilState(
    currentTenantDataAtom,
  );

  useEffect(() => {
    setCurrentTenantState(tenantData);
  }, []);

  return null;
};

export default SetCurrentTenant;
