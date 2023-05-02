'use client';

import { Controller, useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import Link from '@share/components/NextLinkV2';

import useForgotPassword from '../hooks/useForgotPassword';
import { useState } from 'react';
import { currentTenantDataAtom } from '@share/states';
import { useRecoilValue } from 'recoil';

export type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const { id: tenantId } = useRecoilValue(currentTenantDataAtom);

  const { forgotPassword } = useForgotPassword();
  const [submit, setSubmit] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setSubmit(true);
    await forgotPassword({ ...values, tenantId });
    setSubmit(false);
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
            padding: '2rem 10vw',
            width: '100%',
          }}
        >
          <Typography mb={2} variant="h4">
            Quên mật khẩu
          </Typography>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextField
                fullWidth
                sx={{ width: '100%' }}
                label="Vui lòng nhập địa chỉ email"
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
            <Box mt={2} sx={{ display: 'flex' }}>
              <Typography sx={{ mr: 1 }} variant="body2">
                Có tài khoản?
              </Typography>
              <Link href="/sign_in">
                <Typography variant="subtitle2">Đăng nhập tại đây</Typography>
              </Link>
            </Box>
          </Box>

          <Button
            fullWidth
            size="large"
            variant="contained"
            disabled={submit}
            onClick={handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
