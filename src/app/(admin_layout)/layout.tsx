import AdminNav from '@share/components/layout/AdminNav';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  const data = await getTenantDataSSR();

  return (
    <AdminLayoutWrapper>
      <AdminNav user={session?.user} tenant={data} />
      <AdminBodyWrapper>{children}</AdminBodyWrapper>
    </AdminLayoutWrapper>
  );
}
