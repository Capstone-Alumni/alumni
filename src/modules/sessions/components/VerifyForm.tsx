'use client';

import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  TextField,
  Typography,
} from '@mui/material';

import {
  requiredFullNameValidator,
  requiredGradeNClassValidator
} from 'src/modules/share/utils/validators';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

import { VerifyFormValues } from '../types';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup
  .object({
    fullname: requiredFullNameValidator,
    year: requiredGradeNClassValidator,
    class: requiredGradeNClassValidator,
  })
  .required();

const VerifyForm = () => {
  const { signUp, isLoading } = useSignUp();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm<VerifyFormValues>({
    mode: 'onChange',
    defaultValues: {
      fullname: '',
      year: '',
      class: '',
    },
    resolver,
  });

  const onSubmit = async (values: VerifyFormValues) => {
    // await signUp(values);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          margin: '2rem 10vw',
        }}
      >
        <Typography mb={2} variant="h4">
          Thông tin cá nhân
        </Typography>

        <Box mb={5}>
        </Box>

        <Controller
          control={control}
          name="fullname"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Họ và tên*"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          control={control}
          name="year"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Khoá*"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          control={control}
          name="class"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Lớp*"
              {...field}
              type="class"
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default VerifyForm;
