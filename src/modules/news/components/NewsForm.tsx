'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Editor from '@share/components/editor';
import 'quill/dist/quill.snow.css';
import useCreateNews from '../hooks/useCreateNews';
import useUpdateNews from '../hooks/useUpdateNews';
import { CreateNewsProps, News, UpdateNewsProps } from '../types';
import { useRouter } from 'next/navigation';

const NewsForm = ({ initialData }: { initialData?: News }) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });

  const { createNews } = useCreateNews();
  const { updateNews } = useUpdateNews();

  const onAddNews = async (values: CreateNewsProps) => {
    await createNews(values);
  };

  const onUpdateNews = async (newsId: string, data: UpdateNewsProps) => {
    const updateNewsParams = {
      newsId,
      ...data,
    };
    await updateNews(updateNewsParams);
  };

  const handleCancel = () => {
    initialData ? window.location.reload() : router.replace('/admin/news');
  };

  const onSubmitHandler = async (values: CreateNewsProps | UpdateNewsProps) => {
    setSubmitting(true);
    initialData
      ? await onUpdateNews(initialData.id, values)
      : await onAddNews(values as CreateNewsProps);
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
        render={({ field: { value, onChange } }) => (
          <Editor
            id="content"
            sx={{
              height: 500,
              overflow: 'auto',
            }}
            placeholder={'Nội dung'}
            value={value}
            onChange={onChange}
          />
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
          color="error"
          disabled={submitting}
          onClick={handleCancel}
        >
          Hủy
        </Button>
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

export default NewsForm;
