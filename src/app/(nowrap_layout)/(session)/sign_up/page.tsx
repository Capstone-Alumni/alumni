import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import SignUpPage from 'src/modules/sessions/components/SignUpPage';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function SignUpPageWrapper() {
  const session = await getServerSession(nextAuthOptions);
  if (session) {
    redirect('/');
  }

  return <SignUpPage />;
}
