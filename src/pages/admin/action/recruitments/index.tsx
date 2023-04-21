import AdminEventListPage from 'src/modules/recruitments/components/AdminJobListPage';
import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminNav from '@share/components/layout/AdminNav';

export default function Page() {
  return <AdminEventListPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <AdminLayoutWrapper>
    <AdminNav />
    <AdminBodyWrapper>{page}</AdminBodyWrapper>
  </AdminLayoutWrapper>
);
