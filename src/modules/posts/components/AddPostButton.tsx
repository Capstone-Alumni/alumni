import { Box, Button } from '@mui/material';
import { useState } from 'react';
import useCreatePost, { CreatePostParams } from '../hooks/useCreatePost';
import PostForm from './PostForm';

const AddPostButton = () => {
  const [openForm, setOpenForm] = useState(false);
  const { fetchApi: createPost } = useCreatePost();

  const onSave = async (values: CreatePostParams) => {
    await createPost(values);
  };

  return (
    <Box>
      {openForm ? (
        <PostForm onClose={() => setOpenForm(false)} onSave={onSave} />
      ) : (
        <Button fullWidth variant="contained" onClick={() => setOpenForm(true)}>
          Đăng tin
        </Button>
      )}
    </Box>
  );
};

export default AddPostButton;
