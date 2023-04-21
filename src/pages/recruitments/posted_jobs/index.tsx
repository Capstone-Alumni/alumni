import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import RecruitmentSidebar from 'src/modules/recruitments/components/RecruitmentSidebar';
import MyPostedJobsPage from 'src/modules/recruitments/components/MyPostedJobs';
import Body from '@share/components/layout/Body';

export default function Page() {
  return <MyPostedJobsPage />;
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
