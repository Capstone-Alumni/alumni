import * as React from 'react';
// import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Post } from '../type';
import { useSession } from 'next-auth/react';
import { getPublicitySmallIcon } from '@share/helpers/publicityHelpers';
import useLikePost from '../hooks/useLikePost';
import useUnlikePost from '../hooks/useUnlikePost';
import PostCommentForm from './PostCommentForm';
import useCreatePostComment from '../hooks/useCreatePostComment';
import PostCommentList from './PostCommentList';
import ActionButton from '@share/components/ActionButton';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { noop } from 'lodash/fp';
import useDeletePost from '../hooks/useDeletePost';
import EditorPreview from '@share/components/editor/EditorPreview';

// interface ExpandMoreProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand } = props;
//   console.log(expand);
//   return <ExpandMoreIcon />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const PostCardItem = ({ data }: { data: Post }) => {
  const { data: session } = useSession();
  const [expanded, setExpanded] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const { fetchApi: likePost } = useLikePost(data.id);
  const { fetchApi: unlikePost } = useUnlikePost(data.id, session?.user.id);
  const { fetchApi: createComment } = useCreatePostComment(data.id);
  const { fetchApi: deletePost } = useDeletePost(data.id);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isLiked = React.useMemo(() => {
    return data.postLikes.find(like => like.authorId === session?.user.id);
  }, [data.postLikes]);

  const toggleLike = React.useCallback(() => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  }, [isLiked]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          data.authorInformation.userId === session?.user.id ||
          session?.user.accessLevel === 'SCHOOL_ADMIN' ? (
            <ActionButton
              actions={[
                {
                  id: 'update',
                  icon: <BorderColorIcon />,
                  text: 'Chỉnh sửa bài đăng',
                  onClick: noop,
                },
                {
                  id: 'delete',
                  icon: <DeleteIcon color="error" />,
                  text: 'Xoá bài đăng',
                  onClick: () => setOpenModal(true),
                },
              ]}
            />
          ) : null
        }
        title={data.authorInformation.fullName}
        subheader={
          <Stack direction="row" alignItems="center" gap="5px">
            <Typography
              variant="body2"
              color="text.secondary"
              component="span"
              display="block"
            >
              {new Date(data.createdAt).toDateString()}{' '}
              {/* <>{getPublicitySmallIcon(data.publicity)}</> */}
            </Typography>
            <>{getPublicitySmallIcon(data.publicity)}</>
          </Stack>
        }
      />

      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}

      <CardContent>
        <EditorPreview value={data.content} />
      </CardContent>

      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <Button
          startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          color="error"
          onClick={toggleLike}
        >
          {data.postLikes.length}
        </Button>

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}

        <Button onClick={handleExpandClick}>
          {data.postComments?.length || undefined} Bình luận
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider sx={{ marginX: 2 }} />
        <CardContent>
          <Box mb={2}>
            <PostCommentForm
              onSave={createComment}
              onClose={handleExpandClick}
            />
          </Box>

          <PostCommentList postId={data.id} />
        </CardContent>
      </Collapse>

      <ConfirmDeleteModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Bạn có chắc chắn muốn xoá bài đăng này không?"
        onDelete={() => deletePost()}
      />
    </Card>
  );
};

export default PostCardItem;
