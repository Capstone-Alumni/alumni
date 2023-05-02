'use client';

import { Box, Button, TextField, useTheme } from '@mui/material';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import {
  useCreateNewsCommentMutation,
  useUpdateNewsCommentMutation,
} from '@redux/slices/newsCommentSlice';
import { CreateOrUpdateNewComment } from '../types';
import { useSession } from 'next-auth/react';

const validationNewsComment = yup.object({
  commentContent: yup.string().required('Chưa nhật nội dung'),
});

const NewsCommentInput = ({
  newsId,
  initialData,
  user,
  handleCancel,
}: {
  newsId: string;
  initialData?: any;
  user?: any;
  handleCancel?: () => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [hasCommentValue, setHasCommentValue] = useState(false);
  const resolver = useYupValidateionResolver(validationNewsComment);
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      commentContent: initialData?.commentContent || '',
    },
    resolver,
  });

  const [updateNewsComment] = useUpdateNewsCommentMutation();

  const [addNewsComment] = useCreateNewsCommentMutation();

  const handleAddComment = async (values: CreateOrUpdateNewComment) => {
    await addNewsComment({
      newsId: newsId,
      ...values,
    });
    reset();
  };

  const handleUpdateComment = async (values: CreateOrUpdateNewComment) => {
    await updateNewsComment({
      newsId: newsId,
      commentId: initialData.id,
      commentContent: values.commentContent,
    });
    if (handleCancel) {
      handleCancel();
    }
  };

  const handleSubmitComment = async (values: any) => {
    setSubmitting(true);
    initialData
      ? await handleUpdateComment(values)
      : await handleAddComment(values);
    setSubmitting(false);
  };

  const { data } = useSession();

  const isVerified = useMemo(() => {
    return data?.user;
  }, [data]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Controller
        control={control}
        name="commentContent"
        render={({ field }) => {
          const { value } = field;
          if (value.length > 0) {
            setHasCommentValue(true);
          } else {
            setHasCommentValue(false);
          }
          return (
            <TextField
              sx={{
                marginBottom: 3,
              }}
              multiline
              rows={4}
              fullWidth
              disabled={!user || !isVerified}
              label={user ? 'Bình luận' : 'Đăng nhật để bình luận'}
              {...field}
            />
          );
        }}
      />
      <Box
        sx={{
          display: 'flex',
          marginLeft: 'auto',
          gap: theme.spacing(2),
        }}
      >
        {initialData ? (
          <Button
            variant="outlined"
            disabled={submitting || !hasCommentValue}
            onClick={handleCancel}
          >
            Hủy
          </Button>
        ) : null}
        <Button
          variant="contained"
          disabled={submitting || !hasCommentValue}
          onClick={handleSubmit(handleSubmitComment)}
        >
          {initialData ? 'Lưu' : 'Bình luận'}
        </Button>
      </Box>
    </Box>
  );
};

export default NewsCommentInput;
