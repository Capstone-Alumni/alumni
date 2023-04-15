import { verifyUser } from '@share/helpers/SSRAuthorization';
import SocialPage from 'src/modules/social/components/SocialPage';

const Page = async () => {
  await verifyUser();

  return <SocialPage />;
};

export default Page;
