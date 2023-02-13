import Header from '@share/components/layout/Header';
import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import { getTenantDataSSR, verifyUser } from '@share/helpers/SSRAuthorization';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyUser();
  const data = await getTenantDataSSR();

  return (
    <>
      <Header user={session.user} tenant={data} />
      <Body>{children}</Body>
      <Footer tenant={data} />
    </>
  );
}
