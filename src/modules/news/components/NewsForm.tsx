'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import Editor from '@share/components/editor';
import { CreateNewsProps, News, UpdateNewsProps } from '../types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  useCreateNewsMutation,
  useUpdateNewsByIdMutation,
} from 'src/redux/slices/newsSlice';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';

const NewsForm = ({ initialData }: { initialData?: News }) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      newsImageUrl: initialData?.newsImageUrl || '',
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });
  const [hasValueTitle, setHasValueTitle] = useState(false);
  const [hasValueContent, setHasValueContent] = useState(false);

  const [createNews] = useCreateNewsMutation();

  const [updateNews] = useUpdateNewsByIdMutation();

  const onAddNews = async (values: CreateNewsProps) => {
    await createNews(values)
      .unwrap()
      .then(result => {
        if (result.status) {
          toast.success('Đăng tin thành công');
          handleCancel();
        } else {
          toast.error('Đăng tin thất bại');
        }
      });
  };

  const onUpdateNews = async (newsId: string, data: UpdateNewsProps) => {
    const updateNewsParams = {
      newsId,
      ...data,
    };
    await updateNews(updateNewsParams)
      .unwrap()
      .then(result => {
        if (result.status) {
          toast.success('Cập nhật tin thành công');
          handleCancel();
        } else {
          toast.error('Cập nhật tin thất bại');
        }
      });
  };

  const handleCancel = () => {
    initialData ? window.location.reload() : router.replace('/admin/news');
  };

  const onSubmitHandler = async (values: CreateNewsProps | UpdateNewsProps) => {
    setSubmitting(true);
    initialData
      ? await onUpdateNews(initialData.id, {
          ...values,
        })
      : await onAddNews({
          ...values,
        } as CreateNewsProps);
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

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <UploadBackgroundInput
          control={control}
          name="newsImageUrl"
          inputProps={{ label: 'Tải ảnh đại diện cho tin' }}
          containerSx={{ mb: 2 }}
        />

        <Box
          sx={{
            width: '100%',
            display: 'flex',
          }}
        >
          <Controller
            control={control}
            name="title"
            render={({ field }) => {
              const { value } = field;
              if (value.length > 0) {
                setHasValueTitle(true);
              } else {
                setHasValueTitle(false);
              }
              return (
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  label="Tiêu đề"
                  {...field}
                />
              );
            }}
          />
        </Box>

        <Controller
          control={control}
          name="content"
          render={({ field: { value, onChange } }) => {
            if (value.length > 0) {
              setHasValueContent(true);
            } else {
              setHasValueContent(false);
            }
            return (
              <Editor
                id="content"
                sx={{
                  height: 500,
                  overflow: 'auto',
                  width: '100%',
                  marginTop: 3,
                }}
                placeholder={'Nội dung'}
                value={value}
                onChange={onChange}
              />
            );
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          marginTop: '16px',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        <Button variant="outlined" disabled={submitting} onClick={handleCancel}>
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={submitting || !hasValueTitle || !hasValueContent}
          onClick={handleSubmit(onSubmitHandler)}
        >
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default NewsForm;
