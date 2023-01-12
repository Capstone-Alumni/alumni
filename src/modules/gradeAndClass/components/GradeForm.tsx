import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Grade } from '../types';

export type GradeFormValues = {
  code: string;
  name: string;
};

const validationSchema = yup.object({
  code: yup.string().required(),
  name: yup.string(),
});

const GradeForm = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: Grade;
  onClose?: () => void;
  onSubmit: (values: GradeFormValues) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: initialData?.code ?? '',
      name: initialData?.name ?? '',
    },
    resolver,
  });

  const onSubmitHandler = async (values: GradeFormValues) => {
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
          {initialData ? 'Chỉnh sửa thông tin niên khoá' : 'Thêm niên khoá mới'}
        </Typography>
      </Box>

      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <TextField fullWidth label="Mã khoá" {...field} />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field }) => (
          <TextField fullWidth label="Tên khoá" {...field} />
        )}
      />

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
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default GradeForm;
