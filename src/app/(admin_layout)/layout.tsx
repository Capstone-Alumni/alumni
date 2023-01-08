import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import Header from '@share/components/layout/Header';
import Body from '@share/components/layout/Body';
import Footer from '@share/components/layout/Footer';
import { redirect } from 'next/navigation';

const ALLOWED_LEVELS = ['CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await unstable_getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  if (
    !session.user.accessLevel ||
    !ALLOWED_LEVELS.includes(session.user.accessLevel)
  ) {
    redirect('/403_error');
  }

  return (
    <>
      <Header user={session.user} />
      <Body>{children}</Body>
      <Footer />
    </>
  );
}
