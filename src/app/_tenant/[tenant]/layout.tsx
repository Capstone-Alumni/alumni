// import { tenantDataAtomFamily } from '@share/state';
// import { useSetRecoilState } from 'recoil';

import { getTenantData } from '@share/utils/getTenantData';

export default async function TenantLayout({
  params,
  children,
}: {
  params: { tenant: string };
  children: React.ReactNode;
}) {
  const { tenant } = params;
  await getTenantData(tenant);

  return <>{children}</>;
}
