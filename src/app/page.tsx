import Footer from '@share/components/layout/Footer';
import IntroductionSection from 'src/modules/landingPage/components/IntroductionSection';
import NewsSection from 'src/modules/landingPage/components/NewsSection';
// import ClassSection from 'src/modules/landingPage/components/ClassSection';
import AboutSection from 'src/modules/landingPage/components/AboutSection';
import { getTenantDataSSR } from '@share/helpers/SSRAuthorization';
import FeaturesSection from 'src/modules/landingPage/components/FeaturesSection';
// import MembersSection from 'src/modules/landingPage/components/MembersSection';

export default async function Page() {
  const data = await getTenantDataSSR();

  return (
    <>
      <IntroductionSection tenant={data} />
      <NewsSection />
      <FeaturesSection />
      <AboutSection tenant={data} />
      {/* <ClassSection tenant={data} /> */}
      {/* <MembersSection /> */}
      <Footer tenant={data} />
    </>
  );
}
