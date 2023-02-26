'use client';

import { Grid } from '@mui/material';
import AddPostButton from './AddPostButton';
import ClassmateList from './ClassmateList';
import PostList from './PostList';

const PostListPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={9}>
        <AddPostButton />

        <PostList />
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <ClassmateList />
      </Grid>
    </Grid>
  );
};

export default PostListPage;
