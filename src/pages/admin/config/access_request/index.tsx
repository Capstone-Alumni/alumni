import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminNav from '@share/components/layout/AdminNav';
import AdminAccessRequestPage from 'src/modules/verifyAccount/components/AdminAccessRequestPage';

export default function Page() {
  return <AdminAccessRequestPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <AdminLayoutWrapper>
    <AdminNav />
    <AdminBodyWrapper>{page}</AdminBodyWrapper>
  </AdminLayoutWrapper>
);
