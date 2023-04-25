import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import { getServerSession } from 'next-auth';
import ForgotPasswordPage from '../../modules/sessions/components/ForgotPasswordPage';
import { GetServerSideProps } from 'next';
import { nextAuthOptions } from '../api/auth/[...nextauth]';

export default function ForgotPasswordPageWrapper() {
  return <ForgotPasswordPage />;
}

ForgotPasswordPageWrapper.getLayout = (page: JSX.Element) => (
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
