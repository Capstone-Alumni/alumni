import MemberListPage from 'src/modules/members/components/MemberListPage';
import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminNav from '@share/components/layout/AdminNav';

export default function Page() {
  return <MemberListPage />;
}

Page.getLayout = (page: JSX.Element) => (
  <AdminLayoutWrapper>
    <AdminNav />
    <AdminBodyWrapper>{page}</AdminBodyWrapper>
  </AdminLayoutWrapper>
);
