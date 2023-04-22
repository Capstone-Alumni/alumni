import GoingEventListPage from 'src/modules/events/components/GoingEventListPage';
import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import EventSidebar from 'src/modules/events/components/EventSidebar';
import Body from '@share/components/layout/Body';

export default function Page() {
  return <GoingEventListPage />;
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