import { verifyUser } from '@share/helpers/SSRAuthorization';
import HostingEventListPage from 'src/modules/events/components/HostingEventListPage';

export default async function Page() {
  await verifyUser();

  return <HostingEventListPage />;
}
