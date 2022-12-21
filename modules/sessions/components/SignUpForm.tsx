'use client';

import noop from 'lodash/fp/noop';
import omit from 'lodash/fp/omit';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
} from '@mui/material';

import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Icon } from '@iconify/react';

type FormValues = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    const payload = omit(['comfirmPassword'])(values);
    router.push('/verify-account');
  }

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
          <Link variant="subtitle2" href="/sign_in">Đăng nhập tại đây</Link>
        </Box>

        <Controller
          control={control}
          name="fullName"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Họ và tên"
              {...field}
              sx={{ mb: 3 }}  
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Tên tài khoản"
              {...field}
              sx={{ mb: 3 }}  
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Email"
              {...field}
              sx={{ mb: 3 }}  
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Mật khẩu"
              {...field}
              sx={{ mb: 3 }}  
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <TextField
              fullWidth
              label="Xác thực mật khẩu"
              {...field}
              sx={{ mb: 3 }}  
            />
          )}
        />

        <Button fullWidth size="large" variant="contained" onClick={handleSubmit(onSubmit)}>
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
