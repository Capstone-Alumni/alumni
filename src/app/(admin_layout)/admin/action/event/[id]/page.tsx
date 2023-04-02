import { verifyUser } from '@share/helpers/SSRAuthorization';
import AdminEventEditPage from 'src/modules/events/components/AdminEventEditPage';

export default async function Page() {
  await verifyUser();

  return <AdminEventEditPage />;
}
