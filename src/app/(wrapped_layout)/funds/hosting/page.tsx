import { verifyUser } from '@share/helpers/SSRAuthorization';
import HostingFundListPage from 'src/modules/funds/components/HostingFundListPage';

export default async function Page() {
  await verifyUser();

  return <HostingFundListPage />;
}
