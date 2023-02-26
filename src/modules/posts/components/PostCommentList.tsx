import { Box, Stack, Typography, useTheme } from '@mui/material';
import LoadingIndicator from '@share/components/LoadingIndicator';
import MyAvatar from '@share/components/MyAvatar';
import { useRecoilValue } from 'recoil';
import useGetPostCommentList from '../hooks/useGetPostCommentList';
import { postCommentListDataAtomFamily } from '../state';

const PostCommentList = ({ postId }: { postId: string }) => {
  const theme = useTheme();

  const postCommentListDataAtom = postCommentListDataAtomFamily(postId);
  const postCommentListData = useRecoilValue(postCommentListDataAtom);

  const { loadMore, isLoading, loadedAll } = useGetPostCommentList(postId);

  return (
    <Stack direction="column" gap={2}>
      {postCommentListData.map(comment => (
        <Stack key={comment.id} direction="row" gap={1}>
          <MyAvatar />
          <Box
            sx={{
              paddingY: theme.spacing(1),
              paddingX: theme.spacing(2),
              borderRadius: `${theme.shape.borderRadiusMd}px`,
              borderTopLeftRadius: 0,
              backgroundColor: theme.palette.background.neutral,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              {comment.authorInformation.fullName}{' '}
            </Typography>
            <Typography variant="body2">{comment.content}</Typography>
            <Typography variant="caption" fontWeight={400}>
              {new Date(comment.createdAt).toDateString()}
            </Typography>
          </Box>
        </Stack>
      ))}

      {isLoading && !postCommentListData ? <LoadingIndicator /> : null}

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
