// import EventSidebar from 'src/modules/events/components/EventSidebar';

export default async function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <EventSidebar /> */}
      {children}
    </>
  );
}
