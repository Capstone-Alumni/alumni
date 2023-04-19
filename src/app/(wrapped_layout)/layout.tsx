import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getTenantDataSSR();

  console.log('rerender wrapped layout');

  return (
    <>
      <Body>{children}</Body>
      <Footer tenant={data} />
    </>
  );
}
