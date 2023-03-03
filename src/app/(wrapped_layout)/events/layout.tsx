import EventSidebar from 'src/modules/events/components/EventSidebar';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      {session ? <EventSidebar /> : null}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
