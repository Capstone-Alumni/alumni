'use client';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import QuillEditor from '@share/components/quill/QuillEditor';

const CreateNewsForm = ({
  initialData,
  onSubmit,
  onClose,
}: {
  initialData?: any;
  onClose?: () => void;
  onSubmit: (values: any) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
    },
  });

  const onSubmitHandler = async (values: any) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    onClose?.();
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
      <QuillEditor placeholder="Nội dung" />

      <Box
        sx={{
          display: 'flex',
          marginTop: '16px',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        {onClose ? (
          <Button variant="outlined" disabled={submitting} onClick={onClose}>
            Huỷ
          </Button>
        ) : null}
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
