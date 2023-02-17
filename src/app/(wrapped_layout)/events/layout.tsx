import EventSidebar from 'src/modules/events/components/EventSidebar';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
      <EventSidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
