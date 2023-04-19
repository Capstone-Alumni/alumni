'use client';

import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

import useSignIn from '../hooks/useSignIn';
import { useState } from 'react';

export type SignInFormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { signIn } = useSignIn();
  const [signing, setSigning] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setSigning(true);
    await signIn('credentials', values);
    setSigning(false);
  };

  return (
    <Box sx={{ height: '100%' }}>
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
            Đăng nhập
          </Typography>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField fullWidth label="Email" {...field} sx={{ mb: 3 }} />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <TextField
                fullWidth
                type="password"
                label="Mật khẩu"
                {...field}
              />
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
            {/* <Controller
              control={control}
              name="remember"
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Ghi nhớ tài khoản"
                />
              )}
            /> */}
            {/* <Link underline="always">Quên mật khẩu</Link> */}
          </Box>

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={signing}
            onClick={handleSubmit(onSubmit)}
          >
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInForm;
