'use client';

import LoadingIndicator from '@share/components/LoadingIndicator';
import { currentTenantDataAtom, Tenant } from '@share/states';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const SetCurrentTenant = ({
  tenantData,
  children,
}: {
  tenantData: Tenant;
  children: ReactNode;
}) => {
  const [currentTenant, setCurrentTenantState] = useRecoilState(
    currentTenantDataAtom,
  );

  useEffect(() => {
    setCurrentTenantState(tenantData);
  }, []);

  console.log(currentTenant);

  if (!currentTenant.id && currentTenant.id !== '') {
    return <LoadingIndicator />;
  }

  return <>{children}</>;
};

export default SetCurrentTenant;
