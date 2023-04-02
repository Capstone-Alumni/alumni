import { verifyAdminOrMod } from '@share/helpers/SSRAuthorization';
import AdminVnpayIntegrationPage from 'src/modules/vnpay/components/AdminVnpayIntegrationPage';

export default async function Page() {
  await verifyAdminOrMod();

  return <AdminVnpayIntegrationPage />;
}
