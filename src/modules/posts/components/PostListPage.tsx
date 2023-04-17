'use client';

import { Stack, useTheme } from '@mui/material';
import AddPostButton from './AddPostButton';
import PostList from './PostList';
import PostSidebar from './PostSidebar';

const PostListPage = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ sm: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <PostSidebar />

      <Stack
        direction="column"
        gap={2}
        sx={{
          width: '500px',
          [theme.breakpoints.down('md')]: { width: '100%' },
        }}
      >
        <AddPostButton />

        <PostList />
      </Stack>
    </Stack>
  );
};

export default PostListPage;
