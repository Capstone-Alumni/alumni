import EndedFundListPage from 'src/modules/funds/components/EndedFundListPage';
import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import FundSidebar from 'src/modules/funds/components/FundSidebar';
import Body from '@share/components/layout/Body';

export default function Page() {
  return <EndedFundListPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    <Body>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <FundSidebar />
        <div style={{ flex: 1 }}>{page}</div>
      </div>
    </Body>
    <Footer />
  </>
);
