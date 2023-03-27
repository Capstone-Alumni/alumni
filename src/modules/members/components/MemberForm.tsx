/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import {
  passwordValidator,
  requiredEmailValidator,
} from '@share/utils/validators';

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Member } from '../types';
import getRoleName from '@share/utils/getRoleName';
import { useSession } from 'next-auth/react';
import { getLowerRole } from '../utils';

export type MemberFormValues = {
  email: string;
  password: string;
  accessLevel: string;
};

const validationSchema = yup.object({
  email: requiredEmailValidator,
  accessLevel: yup.string(),
  password: passwordValidator,
});

const MemberForm = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: Member;
  onClose?: () => void;
  onSubmit: (values: MemberFormValues) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();

  const roleList = getLowerRole(session?.user.accessLevel);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: initialData?.account.email ?? '',
      accessLevel: initialData?.accessLevel ?? 'ALUMNI',
      password: undefined,
    },
    resolver,
  });

  const onSubmitHandler = async (values: MemberFormValues) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    onClose?.();
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        border: 1,
        borderColor: theme.palette.divider,
        borderRadius: `${theme.shape.borderRadius}px`,
        backgroundColor: theme.palette.background.neutral,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Typography variant="h6">
          {initialData
            ? 'Chỉnh sửa thông tin thành viên'
            : 'Thêm thành viên mới'}
        </Typography>
      </Box>

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            fullWidth
            label="Email"
            {...field}
            disabled={!!initialData?.account.email}
          />
        )}
      />

      <Controller
        name="accessLevel"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            variant="outlined"
            label="Vai trò"
            select
            type="select"
            {...field}
          >
            {roleList?.map((role: string) => (
              <MenuItem key={role} value={role}>
                {/** @ts-ignore */}
                {getRoleName(role)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField fullWidth label="Mật khẩu" type="password" {...field} />
        )}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        {onClose ? (
          <Button variant="outlined" disabled={submitting} onClick={onClose}>
            Huỷ
          </Button>
        ) : null}
        <Button
          variant="contained"
          disabled={submitting}
          onClick={handleSubmit(onSubmitHandler)}
        >
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default MemberForm;
