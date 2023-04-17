import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Class } from '../types';

export type ClassFormValues = {
  name: string;
  // description: string;
};

const validationSchema = yup.object({
  name: yup.string(),
  // description: yup.string(),
});

const ClassForm = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: Class;
  onClose?: () => void;
  onSubmit: (values: ClassFormValues) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: initialData?.name ?? '',
      // description: initialData?.name ?? '',
    },
    resolver,
  });

  const onSubmitHandler = async (values: ClassFormValues) => {
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
          {initialData ? 'Chỉnh sửa thông tin lớp' : 'Thêm lớp mới'}
        </Typography>
      </Box>

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField fullWidth label="Tên lớp" {...field} />
        )}
      />

      {/* <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <TextField fullWidth multiline label="Mô tả" {...field} />
        )}
      /> */}

      <Box
        sx={{
          display: 'flex',
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
          {initialData ? 'Lưu' : 'Thêm'}
        </Button>
      </Box>
    </Box>
  );
};

export default ClassForm;
