import { verifyUser } from '@share/helpers/SSRAuthorization';
import CreateJobPage from 'src/modules/recruitments/components/CreateJobPage';

export default async function Page() {
  await verifyUser();

  return <CreateJobPage />;
}
