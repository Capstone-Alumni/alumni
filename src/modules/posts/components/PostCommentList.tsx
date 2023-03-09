import { Stack, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import useGetPostCommentList from '../hooks/useGetPostCommentList';
import useUpdateComment from '../hooks/useUpdateComment';
import { postCommentListDataAtomFamily } from '../state';
import PostCommentForm from './PostCommentForm';
import PostCommentListItem from './PostCommentListItem';

const PostCommentList = ({ postId }: { postId: string }) => {
  const [selectedId, setSelectedId] = useState('');

  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const postCommentListData = useRecoilValue(postCommentListDataAtom);

  const { loadMore, isLoading, loadedAll } = useGetPostCommentList(postId);
  const { fetchApi } = useUpdateComment(postId);

  return (
    <Stack direction="column" gap={2}>
      {postCommentListData.map(comment =>
        comment.id === selectedId ? (
          <PostCommentForm
            key={comment.id}
            data={comment}
            onSave={async values => {
              await fetchApi({ ...values, commentId: comment.id });
              setSelectedId('');
            }}
          />
        ) : (
          <PostCommentListItem
            key={comment.id}
            comment={comment}
            postId={postId}
            onEdit={setSelectedId}
          />
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
    </Stack>
  );
};

export default PostCommentList;
