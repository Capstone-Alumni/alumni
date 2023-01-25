import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import AdminNav from '@share/components/layout/AdminNav';
import AdminLayoutWrapper from '@share/components/layout/AdminLayoutWrapper';
import AdminBodyWrapper from '@share/components/layout/AdminBodyWrapper';

// const ALLOWED_LEVELS = ['CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  // if (
  //   !session.user.accessLevel ||
  //   !ALLOWED_LEVELS.includes(session.user.accessLevel)
  // ) {
  //   redirect('/403_error');
  // }

  return (
    <AdminLayoutWrapper>
      <AdminNav user={session.user} />
      <AdminBodyWrapper>{children}</AdminBodyWrapper>
    </AdminLayoutWrapper>
  );
}
