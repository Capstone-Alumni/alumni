import { verifyUser } from '@share/helpers/SSRAuthorization';
import EditJobPage from 'src/modules/recruitments/components/EditJobPage';

export default async function Page() {
  await verifyUser();

  return <EditJobPage />;
}
