import { Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useGetPostList from '../hooks/useGetPostList';
import useUpdatePost from '../hooks/useUpdatePost';
import { postListAtom } from '../state';
import PostCardItem from './PostCardItem';
import PostForm from './PostForm';

const PostList = () => {
  const [selectedPostId, setSelectedPostId] = useState('');

  const postListData = useRecoilValue(postListAtom);
  const { loadMore, isLoading, loadedAll } = useGetPostList();
  const { fetchApi } = useUpdatePost();

  return (
    <>
      {postListData.map(post =>
        post.id === selectedPostId ? (
          <PostForm
            key={post.id}
            data={post}
            onClose={() => setSelectedPostId('')}
            onSave={values => fetchApi({ ...values, postId: post.id })}
          />
        ) : (
          <PostCardItem key={post.id} data={post} onEdit={setSelectedPostId} />
        ),
      )}

      {isLoading ? <LoadingIndicator /> : null}

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
