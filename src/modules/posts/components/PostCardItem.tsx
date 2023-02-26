import * as React from 'react';
// import { styled } from '@mui/material/styles';
import { Box, Button, Divider, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '../type';
import { useSession } from 'next-auth/react';
import { getPublicitySmallIcon } from '@share/helpers/publicityHelpers';
import useLikePost from '../hooks/useLikePost';
import useUnlikePost from '../hooks/useUnlikePost';
import PostCommentForm from './PostCommentForm';
import useCreatePostComment from '../hooks/useCreatePostComment';
import PostCommentList from './PostCommentList';

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

  const { fetchApi: likePost } = useLikePost(data.id);
  const { fetchApi: unlikePost } = useUnlikePost(data.id, session?.user.id);
  const { fetchApi: createComment } = useCreatePostComment(data.id);

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
          data.authorInformation.userId === session?.user.id ? (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
        <Typography paragraph color="text.secondary">
          {data.content}
        </Typography>
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
    </Card>
  );
};

export default PostCardItem;
