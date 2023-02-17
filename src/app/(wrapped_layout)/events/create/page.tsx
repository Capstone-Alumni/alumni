import { verifyUser } from '@share/helpers/SSRAuthorization';
import CreateEventPage from 'src/modules/events/components/CreateEventPage';

export default async function Page() {
  await verifyUser();

  return <CreateEventPage />;
}
