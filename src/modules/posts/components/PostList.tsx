import { Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilValue } from 'recoil';
import useGetPostList from '../hooks/useGetPostList';
import { postListAtom } from '../state';
import PostCardItem from './PostCardItem';

const PostList = () => {
  const postListData = useRecoilValue(postListAtom);
  const { loadMore, isLoading, loadedAll } = useGetPostList();

  return (
    <>
      {postListData.map(post => (
        <PostCardItem key={post.id} data={post} />
      ))}

      {isLoading && !postListData ? <LoadingIndicator /> : null}

      {loadedAll || isLoading ? null : (
        <Typography
          color="primary"
          fontWeight={600}
          onClick={loadMore}
          textAlign="center"
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          Xem thêm
        </Typography>
      )}
    </>
  );
};

export default PostList;
