import Header from '@share/components/layout/Header';
import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(nextAuthOptions);
  const data = await getTenantDataSSR();

  return (
    <>
      <Header user={session?.user} tenant={data} />
      <Body>{children}</Body>
      <Footer tenant={data} />
    </>
  );
}
