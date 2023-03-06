import { Stack, Typography } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import { useRecoilValue } from 'recoil';
import useGetPostCommentList from '../hooks/useGetPostCommentList';
import { postCommentListDataAtomFamily } from '../state';
import PostCommentListItem from './PostCommentListItem';

const PostCommentList = ({ postId }: { postId: string }) => {
  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const postCommentListData = useRecoilValue(postCommentListDataAtom);

  const { loadMore, isLoading, loadedAll } = useGetPostCommentList(postId);

  return (
    <Stack direction="column" gap={2}>
      {postCommentListData.map(comment => (
        <PostCommentListItem
          key={comment.id}
          comment={comment}
          postId={postId}
        />
      ))}

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
