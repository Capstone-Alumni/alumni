import { unstable_getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignInPage from 'src/modules/sessions/components/SignInPage';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function SignInPageWrapper() {
  const session = await unstable_getServerSession(nextAuthOptions);
  if (session) {
    redirect('/home');
  }

  return <SignInPage />;
}
