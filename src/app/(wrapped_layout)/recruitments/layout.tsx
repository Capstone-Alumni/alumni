import RecruitmentSidebar from 'src/modules/recruitments/components/RecruitmentSidebar';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      {session ? <RecruitmentSidebar /> : null}
      <div style={{ width: '70%' }}>{children}</div>
    </div>
  );
}
