import { Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import useGetPostList from '../hooks/useGetPostList';
import { postListAtom } from '../state';
import PostCardItem from './PostCardItem';

const PostList = () => {
  const postListData = useRecoilValue(postListAtom);
  const { loadMore, isLoading } = useGetPostList();

  return (
    <>
      {postListData.map(post => (
        <PostCardItem key={post.id} data={post} />
      ))}
      <Button onClick={loadMore}>Load more</Button>
    </>
  );
};

export default PostList;
