import { Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useGetPostList from '../hooks/useGetPostList';
import useUpdatePost from '../hooks/useUpdatePost';
import { getPostListParams, postListAtom } from '../state';
import PostCardItem from './PostCardItem';
import PostForm from './PostForm';
import { useSearchParams } from 'next/navigation';

const PostList = () => {
  const [selectedPostId, setSelectedPostId] = useState('');

  const [params, setParams] = useRecoilState(getPostListParams);
  const postListData = useRecoilValue(postListAtom);
  const { loadMore, isLoading, loadedAll, refresh } = useGetPostList();
  const { fetchApi } = useUpdatePost();

  const searchParam = useSearchParams();
  const gradeSearchParams = searchParam.get('grade') || 'all';
  const classSearchParams = searchParam.get('class') || 'all';

  useEffect(() => {
    refresh();
    setParams(prev => ({
      ...prev,
      gradeId: gradeSearchParams,
      alumClassId: classSearchParams,
    }));
  }, [gradeSearchParams, classSearchParams]);

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
