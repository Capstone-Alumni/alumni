import Footer from '@share/components/layout/Footer';
import Header from '@share/components/layout/Header';
import SignInPage from 'src/modules/sessions/components/SignInPage';

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
