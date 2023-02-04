import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import Header from '@share/components/layout/Header';
import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getTenantData } from '@share/utils/getTenantData';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  const tenant = cookies().get('tenant-subdomain');
  const res = await getTenantData(tenant?.value || '');
  const { data } = res;

  return (
    <>
      <Header user={session.user} tenant={data} />
      <Body>{children}</Body>
      <Footer tenant={data} />
    </>
  );
}
