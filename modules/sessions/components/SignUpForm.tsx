'use client';

import noop from 'lodash/fp/noop';

import * as yup from 'yup';

import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Icon } from '@iconify/react';

import {
  requiredConfirmPasswordValidator,
  requiredEmailValidator,
  requiredPasswordValidator,
  requiredUsernameValidator,
} from '@share/utils/validators';
import useYupValidateionResolver from '@share/utils/useYupValidationResolver';

import { SignUpFormValues } from '../types';
import useSignUp from '../hooks/useSignUp';

const validationSchema = yup
  .object({
    username: requiredUsernameValidator,
    email: requiredEmailValidator,
    password: requiredPasswordValidator,
    confirmPassword: requiredConfirmPasswordValidator,
  })
  .required();

const SignUpForm = () => {
  const { signUp, isLoading } = useSignUp();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm<SignUpFormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver,
  });

  const onSubmit = async (values: SignUpFormValues) => {
    await signUp(values);
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
          Đăng ký
        </Typography>

        <Box mb={5} sx={{ display: 'flex' }}>
          <Typography sx={{ mr: 1 }} variant="body2">
            Đã có tài khoản?
          </Typography>
          <Link variant="subtitle2" href="/sign_in">
            Đăng nhập tại đây
          </Link>
        </Box>

        <Controller
          control={control}
          name="username"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Tên tài khoản *"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Email *"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Mật khẩu *"
              {...field}
              type="password"
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Xác thực mật khẩu *"
              type="password"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          Đăng ký
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography sx={{ color: 'text.secondary' }} variant="body2">
            Hoặc
          </Typography>
        </Divider>

        <Stack direction="row" justifyContent="center" spacing={2}>
          <IconButton onClick={() => signIn('google')} size="large">
            <Icon color="#DF3E30" height={24} icon={googleFill} />
          </IconButton>

          <IconButton onClick={noop} size="large">
            <Icon color="#1877F2" height={24} icon={facebookFill} />
          </IconButton>

          <IconButton onClick={noop} size="large">
            <Icon color="#1C9CEA" height={24} icon={twitterFill} />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUpForm;
