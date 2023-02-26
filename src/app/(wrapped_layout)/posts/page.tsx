import { verifyUser } from '@share/helpers/SSRAuthorization';
import PostListPage from 'src/modules/posts/components/PostListPage';

const Page = async () => {
  await verifyUser();

  return <PostListPage />;
};

export default Page;
