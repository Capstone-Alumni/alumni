'use client';

import * as yup from 'yup';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import {
  requiredConfirmPasswordValidator,
  requiredPasswordValidator,
} from 'src/modules/share/utils/validators';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

import Body from '@share/components/layout/Body';
import { useSearchParams } from 'next/navigation';
import useResetPassword from '../hooks/useResetPassword';

const validationSchema = yup
  .object({
    password: requiredPasswordValidator,
    confirmPassword: requiredConfirmPasswordValidator,
  })
  .required('Bắt buộc');

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const router = useRouter();

  const { resetPassword, isLoading } = useResetPassword();

  const resolver = useYupValidateionResolver(validationSchema);

  const methods = useForm<{
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    mode: 'onChange',
    defaultValues: {
      email: email as string,
      password: '',
      confirmPassword: '',
    },
    resolver,
  });
  const { control, handleSubmit } = methods;

  const onSubmit = async (values: { password: string }) => {
    const res = await resetPassword({
      password: values.password,
      token: token,
    });
    if (res?.data?.email) {
      toast.success('Đổi mật khẩu thành công');
      router.replace('/sign_in');
    }
  };

  return (
    <Body>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <FormProvider {...methods}>
          <Box
            sx={{
              margin: '2rem 10vw',
              width: '100%',
            }}
          >
            <Typography mb={2} variant="h4">
              Tạo lại mật khẩu
            </Typography>

            <Stack direction="column" gap={2} sx={{ width: '100%' }}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Email *"
                    disabled
                    {...field}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Mật khẩu mới *"
                    {...field}
                    type="password"
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    fullWidth
                    label="Xác thực mật khẩu mới *"
                    type="password"
                    {...field}
                    error={Boolean(error?.message)}
                    helperText={error?.message}
                  />
                )}
              />

              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                Xác nhận
              </Button>
            </Stack>
          </Box>
        </FormProvider>
      </Box>
    </Body>
  );
};

export default ResetPassword;
