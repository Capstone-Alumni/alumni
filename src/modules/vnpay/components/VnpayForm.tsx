import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { VnpayConfig } from '../types';

export type VnpayFormValues = {
  tmnCode: string;
  hashSecret: string;
};

const validationSchema = yup.object({
  tmnCode: yup.string().required('Bắt buộc'),
  hashSecret: yup.string().required('Bắt buộc'),
});

const VnpayForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: VnpayConfig;
  onSubmit: (values: VnpayFormValues) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      tmnCode: initialData?.tmnCode ?? '',
      hashSecret: initialData?.hashSecret ?? '',
    },
    resolver,
  });

  const onSubmitHandler = async (values: VnpayFormValues) => {
    setSubmitting(true);
    await onSubmit(values);
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
        <Typography variant="h6">Cấu hình VNPay</Typography>
      </Box>

      <Controller
        control={control}
        name="tmnCode"
        render={({ field }) => (
          <TextField
            fullWidth
            label="Terminal ID / Mã Website (vnp_TmnCode)"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="hashSecret"
        render={({ field }) => (
          <TextField
            fullWidth
            label="Secret Key / Chuỗi bí mật tạo checksum (vnp_HashSecret)"
            {...field}
          />
        )}
      />

      <Box
        sx={{
          display: 'flex',
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

export default VnpayForm;
