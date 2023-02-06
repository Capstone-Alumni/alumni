import { unstable_getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import MemberListPage from 'src/modules/members/components/MemberListPage';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function Page() {
  const session = await unstable_getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/');
  }

  return <MemberListPage />;
}
