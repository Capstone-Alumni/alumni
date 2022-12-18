"use client"

import { signIn } from "next-auth/react";

import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { SCHOOL_NAME } from 'constant';
import { useForm, Controller } from 'react-hook-form';
import { useTheme } from "@mui/system";
import { Divider, IconButton, Link, Stack, TextField } from "@mui/material";

import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import { Icon } from '@iconify/react';

const SignInForm = () => {
  const theme = useTheme();
  console.log(theme);

  const { control } = useForm({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      remember: false,
    }
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
            margin: 'auto'
          }}
        >
          <Typography variant="h4" mb={2}>Đăng nhập</Typography>

          <Box sx={{ display: 'flex' }} mb={5}>
            <Typography variant="body2" sx={{ mr: 1 }}>Chưa có tài khoản?</Typography>
            <Link variant="subtitle2">Đăng ký ngay</Link>
          </Box>
          

          <Controller
            control={control}
            name="usernameOrEmail"
            render={({ field }) => (
              <TextField
                label='Username hoặc email'
                fullWidth
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
                label='Mật khẩu'
                fullWidth
                {...field}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="Ghi nhớ tài khoản" />
              )}
            />
            <Link underline="always">Quên mật khẩu</Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
          >
            Đăng nhập
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Hoặc
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton size="large" onClick={() => signIn("google")}>
              <Icon icon={googleFill} color="#DF3E30" height={24} />
            </IconButton>

            <IconButton size="large" onClick={() => {}}>
              <Icon icon={facebookFill} color="#1877F2" height={24} />
            </IconButton>

            <IconButton size="large" onClick={() => {}}>
              <Icon icon={twitterFill} color="#1C9CEA" height={24} />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
