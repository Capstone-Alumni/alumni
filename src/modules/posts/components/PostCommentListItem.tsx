import { Box, Stack, Typography, useTheme } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionButton from '@share/components/ActionButton';
import MyAvatar from '@share/components/MyAvatar';
import { noop } from 'lodash/fp';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import useDeleteComment from '../hooks/useDeleteComment';
import { PostComment } from '../type';
import { useState } from 'react';

const PostCommentListItem = ({
  comment,
  postId,
}: {
  comment: PostComment;
  postId: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const { fetchApi: deleteComment } = useDeleteComment(postId, comment.id);

  return (
    <Stack key={comment.id} direction="row" gap={1}>
      <MyAvatar
        size="small"
        displayName={comment.authorInformation.fullName}
        photoUrl={comment.authorInformation.avatarUrl}
      />
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

      <ActionButton
        actions={[
          {
            id: 'update',
            icon: <BorderColorIcon />,
            text: 'Chỉnh sửa bình luận',
            onClick: noop,
          },
          {
            id: 'delete',
            icon: <DeleteIcon color="error" />,
            text: 'Xoá bình luận',
            onClick: () => setOpenModal(true),
          },
        ]}
      />

      <ConfirmDeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Bạn có chắc chắn muốn xoá bài đăng này không?"
        onDelete={() => deleteComment()}
      />
    </Stack>
  );
};

export default PostCommentListItem;
