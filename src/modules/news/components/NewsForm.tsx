'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Editor from '@share/components/editor';
import 'quill/dist/quill.snow.css';
import useCreateNews from '../hooks/useCreateNews';
import { CreateNewsProps, News, UpdateNewsProps } from '../types';
import { useRouter } from 'next/navigation';
import { UploadAvatar as UploadImage } from '@share/components/upload';
import { setStorage } from 'src/firebase/methods/setStorage';
import { generateUniqSerial } from 'src/utils';
import { toast } from 'react-toastify';
import { useUpdateNewsByIdMutation } from 'src/redux/slices/newsSlice';

const NewsForm = ({ initialData }: { initialData?: News }) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(initialData?.newsImageUrl ?? '');

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });

  const { createNews } = useCreateNews();
  // const { updateNews } = useUpdateNews();

  const [updateNews] = useUpdateNewsByIdMutation();

  const onAddNews = async (values: CreateNewsProps) => {
    await createNews(values);
  };

  const onUpdateNews = async (newsId: string, data: UpdateNewsProps) => {
    const updateNewsParams = {
      newsId,
      ...data,
    };
    await updateNews(updateNewsParams);
    handleCancel();
  };

  const handleCancel = () => {
    initialData ? window.location.reload() : router.replace('/admin/news');
  };

  const onSubmitHandler = async (values: CreateNewsProps | UpdateNewsProps) => {
    setSubmitting(true);
    initialData
      ? await onUpdateNews(initialData.id, {
          ...values,
          newsImageUrl: imageUrl,
        })
      : await onAddNews({
          ...values,
          newsImageUrl: imageUrl,
        } as CreateNewsProps);
    setSubmitting(false);
  };

  const handleDrop = async (acceptedFiles: any, type: string) => {
    const { uploadNewsImg } = setStorage();

    const file = acceptedFiles[0];

    try {
      toast.loading('Uploading...', {
        toastId: type,
      });
      const url = await uploadNewsImg(generateUniqSerial(), file);
      setImageUrl(url);
      toast.dismiss(type);
      toast.success('Thêm ảnh thành công');
    } catch (error: any) {
      toast.dismiss(type);
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
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
        }}
      >
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextField
              sx={{
                width: '90%',
              }}
              fullWidth
              label="Tiêu đề"
              {...field}
            />
          )}
        />
        <Tooltip title="Tải ảnh đại diện cho tin">
          <Box ml={2}>
            <UploadImage
              file={imageUrl}
              maxSize={3145728}
              icon
              sx={{
                width: '50px',
                height: '50px',
                cursor: 'pointer',
              }}
              onDrop={(e, _) => handleDrop(e, 'newsImage')}
            />
          </Box>
        </Tooltip>
      </Box>
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
        <Button variant="outlined" disabled={submitting} onClick={handleCancel}>
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
