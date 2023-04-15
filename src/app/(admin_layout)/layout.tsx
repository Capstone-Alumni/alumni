import AdminNav from '@share/components/layout/AdminNav';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';
import { getServerSession } from 'next-auth';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const data = await getTenantDataSSR();

  return (
    <AdminLayoutWrapper>
      <AdminNav user={session?.user} tenant={data} />
      <AdminBodyWrapper>{children}</AdminBodyWrapper>
    </AdminLayoutWrapper>
  );
}
