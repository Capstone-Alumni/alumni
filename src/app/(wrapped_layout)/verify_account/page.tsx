import { redirect } from 'next/navigation';
import VerifyAccountPage from 'src/modules/verifyAccount/components/VerifyAccountPage';
import WaitingAccessPage from 'src/modules/verifyAccount/components/WaitingAccessPage';
import { getOwnedAccessRequest } from 'src/modules/verifyAccount/SSRHelpers/getOwnedAccessRequest';

export default async function VerifyAccountPageWrapper() {
  const accessRequest = await getOwnedAccessRequest();

  if (!accessRequest) {
    return <VerifyAccountPage initialData={accessRequest} />;
  }

  if (!accessRequest.isApproved) {
    return <WaitingAccessPage />;
  }

  redirect('/');
}
