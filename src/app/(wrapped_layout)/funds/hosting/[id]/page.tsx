import { verifyUser } from '@share/helpers/SSRAuthorization';
import HostingFundEditPage from 'src/modules/funds/components/HostingFundEditPage';

export default async function Page() {
  await verifyUser();

  return <HostingFundEditPage />;
}
