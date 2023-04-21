import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import SignUpPage from 'src/modules/sessions/components/SignUpPage';

export default function SignUpPageWrapper() {
  return <SignUpPage />;
}

SignUpPageWrapper.getLayout = (page: JSX.Element) => (
  <>
    <Header />
    {page}
    <Footer />
  </>
);
