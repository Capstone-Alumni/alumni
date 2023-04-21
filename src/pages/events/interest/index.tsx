import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import EventSidebar from 'src/modules/events/components/EventSidebar';
import InterestEventListPage from 'src/modules/events/components/InterestEventListPage';

export default function Page() {
  return <InterestEventListPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    <Body>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
        <EventSidebar />
        <div style={{ flex: 1 }}>{page}</div>
      </div>
    </Body>
    <Footer />
  </>
);
