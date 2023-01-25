import { unstable_getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import VerifyAccountPage from 'src/modules/sessions/components/VerifyAccountPage';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function VerifyAccountPageWrapper() {
  const session = await unstable_getServerSession(nextAuthOptions);
  if (!session) {
    redirect('/sign_in');
  }

  return <VerifyAccountPage />;
}
