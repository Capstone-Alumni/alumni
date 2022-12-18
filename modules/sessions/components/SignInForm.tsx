"use client"

import { signIn } from "next-auth/react";

import FormControlLabel from '@mui/material/FormControlLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { SCHOOL_NAME } from 'constant';
import { useForm, Controller } from 'react-hook-form';

const SignInForm = () => {
  const { control } = useForm({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
      remember: false,
    }
  });

  return (
    <Box>
      <Box
        sx={{
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
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography>Đăng nhập</Typography>
          <Typography>Chào mừng bạn quay lại, hãy nhập thông tin đăng nhập</Typography>

          <Controller
            control={control}
            name="usernameOrEmail"
            render={({ field }) => (
              <OutlinedInput
                placeholder='Username hoặc email'
                fullWidth
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <OutlinedInput
                placeholder='password'
                fullWidth
                {...field}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="Label" />
              )}
            />
            <Typography>Quên mật khẩu</Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
          >
            Đăng nhập
          </Button>

          <Button
            fullWidth
            startIcon={<GoogleIcon />}
            variant="outlined"
            onClick={() => signIn("google")}
          >
            Tiếp tục bằng Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
