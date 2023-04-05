import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import Header from '@share/components/layout/Header';
import Footer from '@share/components/layout/Footer';
import IntroductionSection from 'src/modules/landingPage/components/IntroductionSection';
import NewsSection from 'src/modules/landingPage/components/NewsSection';
// import ClassSection from 'src/modules/landingPage/components/ClassSection';
import AboutSection from 'src/modules/landingPage/components/AboutSection';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';
import FeaturesSection from 'src/modules/landingPage/components/FeaturesSection';
import MembersSection from 'src/modules/landingPage/components/MembersSection';

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);

  const data = await getTenantDataSSR();

  return (
    <>
      <Header user={session?.user} tenant={data} hasAnimation />
      <IntroductionSection tenant={data} />
      <AboutSection tenant={data} />
      {/* <ClassSection tenant={data} /> */}
      <MembersSection />
      <NewsSection />
      <FeaturesSection />
      <Footer tenant={data} />
    </>
  );
}
