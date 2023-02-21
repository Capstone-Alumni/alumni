import { verifyUser } from '@share/helpers/SSRAuthorization';
import HostingEventEditPage from 'src/modules/events/components/HostingEventEditPage';

export default async function Page() {
  await verifyUser();

  return <HostingEventEditPage />;
}
