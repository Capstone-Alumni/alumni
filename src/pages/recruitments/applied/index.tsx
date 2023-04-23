import AppliedJobListPage from 'src/modules/recruitments/components/AppliedJobListPage';
import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import RecruitmentSidebar from 'src/modules/recruitments/components/RecruitmentSidebar';
import Body from '@share/components/layout/Body';
import { GetServerSideProps } from 'next';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
