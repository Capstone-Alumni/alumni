import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import Header from '@share/components/layout/Header';
import Footer from '@share/components/layout/Footer';
import { cookies } from 'next/headers';
import { getTenantData } from '@share/utils/getTenantData';
import IntroductionSection from 'src/modules/landingPage/components/IntroductionSection';
import NewsSection from 'src/modules/landingPage/components/NewsSection';
import ClassSection from 'src/modules/landingPage/components/ClassSection';
import AboutSection from 'src/modules/landingPage/components/AboutSection';

export default async function Page() {
  const session = await unstable_getServerSession(nextAuthOptions);

  const tenant = cookies().get('tenant-subdomain');
  const res = await getTenantData(tenant?.value || '');
  const { data } = res;

  return (
    <>
      <Header user={session?.user} tenant={data} />
      <IntroductionSection tenant={data} />
      <AboutSection tenant={data} />
      <ClassSection />
      <NewsSection />
      <Footer tenant={data} />
    </>
  );
}
