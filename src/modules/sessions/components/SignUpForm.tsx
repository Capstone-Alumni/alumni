'use client';

import * as yup from 'yup';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import Link from '@share/components/NextLinkV2';

import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  requiredEmailValidator,
  requiredFullNameValidator,
} from 'src/modules/share/utils/validators';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

import { SignUpFormValues } from '../types';
import useSignUp from '../hooks/useSignUp';
import TextInput from '@share/components/form/TextInput';
import { GradeClassForm } from 'src/modules/members/components/MemberForm';
import DateInput from '@share/components/form/DateInput';
import ReportModal from 'src/modules/reports/components/ReportModal';

const validationSchema = yup
  .object({
    email: requiredEmailValidator,
    fullName: requiredFullNameValidator,
    gradeClass: yup.array(),
    phone: yup.string(),
  })
  .required();

const SignUpForm = () => {
  const { signUp, isLoading } = useSignUp();

  const resolver = useYupValidateionResolver(validationSchema);

  const methods = useForm<SignUpFormValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      phone: '',
      dateOfBirth: undefined,
      email: '',
      gradeClass: [
        {
          grade: [],
          alumClass: [],
        },
      ],
    },
    resolver,
  });
  const { control, handleSubmit } = methods;

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
      <FormProvider {...methods}>
        <Box
          sx={{
            margin: '2rem 10vw',
            width: '100%',
          }}
        >
          <Typography mb={2} variant="h4">
            Đăng ký
          </Typography>

          <Stack direction="column" gap={2} sx={{ width: '100%' }}>
            <Typography variant="h6">Thông tin cá nhân</Typography>

            <TextInput
              control={control}
              name="fullName"
              inputProps={{
                label: 'Họ và tên',
                sx: {
                  width: '100%',
                },
              }}
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
                />
              )}
            />

            <TextInput
              control={control}
              name="phone"
              inputProps={{
                label: 'Số điện thoại',
                sx: {
                  width: '100%',
                },
              }}
            />

            <DateInput
              control={control}
              name="dateOfBirth"
              inputProps={{
                label: 'Ngày sinh',
              }}
              textProps={{
                sx: {
                  width: '100%',
                },
              }}
            />

            <Divider />

            <GradeClassForm isSignup multiple={false} getAll />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Typography sx={{ mr: 1 }} variant="body2">
                Bạn gặp khó khăn?
              </Typography>
              <ReportModal>
                <Typography
                  fontWeight="bold"
                  sx={{ mr: 1, cursor: 'pointer' }}
                  variant="body2"
                  color="error"
                >
                  Báo cáo tại đây
                </Typography>
              </ReportModal>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              Đăng ký
            </Button>
          </Stack>
          <Box mt={5} sx={{ display: 'flex' }}>
            <Typography sx={{ mr: 1 }} variant="body2">
              Đã có tài khoản?
            </Typography>
            <Link href="/sign_in">
              <Typography variant="subtitle2">Đăng nhập tại đây</Typography>
            </Link>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default SignUpForm;
