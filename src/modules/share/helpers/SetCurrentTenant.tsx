'use client';

import LoadingIndicator from '@share/components/LoadingIndicator';
import { currentTenantDataAtom, Tenant } from '@share/states';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const SetCurrentTenant = ({
  tenantData,
  children,
}: {
  tenantData: Tenant;
  children: JSX.Element;
}) => {
  const [currentTenant, setCurrentTenantState] = useRecoilState(
    currentTenantDataAtom,
  );

  useEffect(() => {
    setCurrentTenantState(tenantData);
  }, []);

  if (!currentTenant) {
    return <LoadingIndicator />;
  }

  return children;
};

export default SetCurrentTenant;
