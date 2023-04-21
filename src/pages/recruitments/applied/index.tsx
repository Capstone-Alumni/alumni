import AppliedJobListPage from 'src/modules/recruitments/components/AppliedJobListPage';
import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import RecruitmentSidebar from 'src/modules/recruitments/components/RecruitmentSidebar';
import Body from '@share/components/layout/Body';

export default function Page() {
  return <AppliedJobListPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    <Body>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <RecruitmentSidebar />
        <div style={{ flex: 1 }}>{page}</div>
      </div>
    </Body>
    <Footer />
  </>
);
