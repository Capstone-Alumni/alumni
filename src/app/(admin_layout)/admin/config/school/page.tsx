import { verifyAdminOrMod } from '@share/helpers/SSRAuthorization';
import EditSchoolPage from 'src/modules/school/components/EditSchoolPage';

export default async function Page() {
  await verifyAdminOrMod();

  return <EditSchoolPage />;
}
