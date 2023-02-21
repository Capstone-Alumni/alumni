import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
// material
import { Card, Stack, Typography, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// @types
import { Information } from '@prisma/client';
import { useAppDispatch } from 'src/redux/hooks';
import { reducerPath } from 'src/redux/slices/searchProfiles';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import TextInput from '@share/components/form/TextInput';
import DateTimeInput from '@share/components/form/DateTimeInput';

const ProfileInformationEditSection = ({
  userInformation,
  userProfileId,
  onCancel,
  onSave,
}: {
  userInformation?: Information;
  userProfileId?: string;
  onCancel: () => void;
  onSave: (props: any) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const theme = useTheme();
  const dispatch = useAppDispatch();

  const NewUserSchema = Yup.object().shape({
    bio: Yup.string(),
    email: Yup.string(),
    fullName: Yup.string(),
    facebookUrl: Yup.string(),
    phoneNumber: Yup.string(),
  });

  const resolver = useYupValidateionResolver(NewUserSchema);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      userId: userInformation?.userId || '',
      bio: userInformation?.bio || '',
      fullName: userInformation?.fullName || '',
      email: userInformation?.email || '',
      facebookUrl: userInformation?.facebookUrl || '',
      phone: userInformation?.phone || '',
      dateOfBirth: userInformation?.dateOfBirth || null,
    },
    resolver,
  });

  const onSubmit = async (values: any) => {
    setIsSaving(true);
    try {
      const { ...data } = values;
      if (userProfileId) {
        await onSave({
          ...data,
          userId: userProfileId,
        });
        toast.success('Cập nhật thành công');
        dispatch({
          type: `${reducerPath}/invalidateTags`,
          payload: ['Search'],
        });
      }
    } catch (error: any) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
    setIsSaving(false);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        sx={{
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Typography
          variant="h5"
          style={{
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center',
          }}
        >
          <PersonIcon
            fontSize="large"
            style={{
              color: theme.palette.primary.main,
              marginRight: theme.spacing(1),
            }}
          />
          Thông tin cơ bản
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ mb: 2 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 2 }}
        >
          <TextInput
            control={control}
            name="bio"
            inputProps={{ label: 'Bio', fullWidth: true }}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 2 }}
        >
          <TextInput
            control={control}
            name="fullName"
            inputProps={{ label: 'Họ và tên', fullWidth: true }}
          />
          <TextInput
            control={control}
            name="email"
            inputProps={{ label: 'Địa chỉ Email', fullWidth: true }}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 2 }}
        >
          <TextInput
            control={control}
            name="facebookUrl"
            inputProps={{ label: 'Địa chỉ Facebook', fullWidth: true }}
          />
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 2 }}
        >
          <TextInput
            control={control}
            name="phone"
            inputProps={{ label: 'Số điện thoại', fullWidth: true }}
          />

          <DateTimeInput
            control={control}
            name="dateOfBirth"
            inputProps={{
              fullWidth: true,
              label: 'Ngày sinh',
            }}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Button onClick={onCancel}>Huỷ</Button>
        <Button
          variant="contained"
          disabled={isSaving}
          onClick={handleSubmit(onSubmit)}
        >
          Lưu
        </Button>
      </Stack>
    </Card>
  );
};
export default ProfileInformationEditSection;
