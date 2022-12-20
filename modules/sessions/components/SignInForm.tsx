'use client';

import noop from 'lodash/fp/noop';

import { signIn } from 'next-auth/react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { SCHOOL_NAME } from 'constant';
import { Controller, useForm } from 'react-hook-form';
import { useTheme } from '@mui/system';
import { Divider, IconButton, Link, Stack, TextField } from '@mui/material';

import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Icon } from '@iconify/react';

const SignInForm = () => {
  const { control } = useForm({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      remember: false,
    },
  });

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">{SCHOOL_NAME}</Typography>
      </Box>

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
            margin: 'auto',
          }}
        >
          <Typography mb={2} variant="h4">
            Đăng nhập
          </Typography>

          <Box mb={5} sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 1 }} variant="body2">
              Chưa có tài khoản?
            </Typography>
            <Link variant="subtitle2">Đăng ký ngay</Link>
          </Box>

          <Controller
            control={control}
            name="usernameOrEmail"
            render={({ field }) => (
              <TextField
                fullWidth
                label="Username hoặc email"
                {...field}
                sx={{ mb: 3 }}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField fullWidth label="Mật khẩu" {...field} />
            )}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              my: 1,
            }}
          >
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Ghi nhớ tài khoản"
                />
              )}
            />
            <Link underline="always">Quên mật khẩu</Link>
          </Box>

          <Button fullWidth size="large" variant="contained">
            Đăng nhập
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
    </Box>
  );
};

export default SignInForm;
