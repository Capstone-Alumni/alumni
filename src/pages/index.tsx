import IntroductionSection from 'src/modules/landingPage/components/IntroductionSection';
import NewsSection from 'src/modules/landingPage/components/NewsSection';
// import ClassSection from 'src/modules/landingPage/components/ClassSection';
import AboutSection from 'src/modules/landingPage/components/AboutSection';
import FeaturesSection from 'src/modules/landingPage/components/FeaturesSection';
import { useRecoilValue } from 'recoil';
import { currentTenantDataAtom } from '@share/states';
import Header from '@share/components/layout/Header';
import Footer from '@share/components/layout/Footer';
// import MembersSection from 'src/modules/landingPage/components/MembersSection';

export default function Page() {
  const data = useRecoilValue(currentTenantDataAtom);

  return (
    <>
      <IntroductionSection tenant={data} />
      <NewsSection />
      <FeaturesSection />
      <AboutSection tenant={data} />
      {/* <ClassSection tenant={data} /> */}
      {/* <MembersSection /> */}
    </>
  );
}

Page.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
