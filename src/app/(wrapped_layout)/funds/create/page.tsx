import { verifyUser } from '@share/helpers/SSRAuthorization';
import CreateFundPage from 'src/modules/funds/components/CreateFundPage';

export default async function Page() {
  await verifyUser();

  return <CreateFundPage />;
}
