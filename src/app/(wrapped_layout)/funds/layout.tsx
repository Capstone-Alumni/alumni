import { getServerSession } from 'next-auth';
import FundSidebar from 'src/modules/funds/components/FundSidebar';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      {session ? <FundSidebar user={session.user} /> : null}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
