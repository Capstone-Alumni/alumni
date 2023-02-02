'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Editor from '@share/components/editor';
import 'quill/dist/quill.snow.css';
import useCreateNews from '../hooks/useCreateNews';

const CreateNewsForm = ({ initialData }: { initialData?: any }) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });

  const { createNews } = useCreateNews();

  const onAddNews = async (values: any) => {
    await createNews(values);
  };

  const onSubmitHandler = async (values: any) => {
    setSubmitting(true);
    await onAddNews(values);
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: `${theme.shape.borderRadius}px`,
        backgroundColor: theme.palette.background.neutral,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6">
          {initialData ? 'Chỉnh sửa tin tức' : 'Thêm tin tức'}
        </Typography>
      </Box>

      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextField fullWidth label="Tiêu đề" {...field} />
        )}
      />
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <Editor id="content" placeholder={'Nội dung'} {...field} />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          marginTop: '16px',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        <Button
          variant="contained"
          disabled={submitting}
          onClick={handleSubmit(onSubmitHandler)}
        >
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNewsForm;
