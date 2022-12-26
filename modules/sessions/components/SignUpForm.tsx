'use client';

import noop from 'lodash/fp/noop';
import omit from 'lodash/fp/omit';

import * as yup from 'yup';

import { useRouter } from 'next/navigation';
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

import useYupValidateionResolver from 'modules/share/utils/useYupValidationResolver';

type FormValues = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validationSchema = yup
  .object({
    fullName: yup
      .string()
      .matches(
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
        'Tên của bạn không hợp lệ',
      )
      .max(40, 'Tối đa 40 ký tự')
      .required('Bắt buộc'),
    username: yup
      .string()
      .matches(
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/, // Không bắt đàu bằng . hoặc _, không chứa ._ _. __ .. ở giữa, không kêt thúc bằng _ hoặc ., chỉ chứa a-zA-Z0-9._@
        'Tên tài khoản không hợp lệ',
      )
      .min(6, 'Tổi thiểu 6 ký tự')
      .max(40, 'Tối đa 40 ký tự')
      .required('Bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Bắt buộc'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Mật khẩu phải chứa ít nhất 8 ký tự, trong đó có phải có 1 chữ in thường, 1 chữ in hoa, 1 chữ số, và 1 ký tự đặt biệt',
      )
      .min(8, 'Tối thiểu 8 ký tự')
      .max(40, 'Tối đa 40 ký tự')
      .required('Bắt buộc'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
      .required('Bắt buộc'),
  })
  .required();

const SignUpForm = () => {
  const router = useRouter();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver,
  });

  const onSubmit = (values: FormValues) => {
    const payload = omit(['comfirmPassword'])(values);
    router.push('/verify-account');
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
          name="fullName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Họ và tên *"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />

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
