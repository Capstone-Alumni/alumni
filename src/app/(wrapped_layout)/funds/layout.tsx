import FundSidebar from 'src/modules/funds/components/FundSidebar';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <FundSidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
