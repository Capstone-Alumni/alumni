import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import SignInPage from 'src/modules/sessions/components/SignInPage';
import { GetServerSideProps } from 'next';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export default function SignInPageWrapper() {
  return <SignInPage />;
}

SignInPageWrapper.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session) {
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
