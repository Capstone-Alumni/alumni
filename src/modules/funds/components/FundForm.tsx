import { AccessLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Fund } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, InputAdornment, useTheme } from '@mui/material';
import Checkbox from '@share/components/form/Checkbox';
import DateTimeInput from '@share/components/form/DateTimeInput';
// import SelectInput from '@share/components/form/SelectInput';
// import { Typography } from '@mui/material';
import { useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';

export type FundFormValues = {
  title: string;
  description?: string;
  isOffline: boolean;
  location?: string;
  startTime: Date;
  endTime?: Date;
  isEnded?: boolean;
  targetBalance: number;
  currentBalance: number;
  publicity: AccessLevel;
};

const validationSchema = yup.object({
  title: yup.string().required(),
  startTime: yup.date().required(),
  publicity: yup.string().required(),
  targetBalance: yup.number().required(),
  currentBalance: yup.number().required(),
});

const FundForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: Fund;
  onSubmit: (values: FundFormValues) => Promise<void>;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description,
      isOffline: initialData?.isOffline ?? false,
      location: initialData?.location,
      startTime: initialData?.startTime
        ? new Date(initialData.startTime)
        : new Date(),
      endTime: initialData?.endTime ? new Date(initialData.endTime) : null,
      isEnded: initialData?.isEnded,
      targetBalance: initialData?.targetBalance ?? 0,
      currentBalance: initialData?.currentBalance ?? 0,
      publicity: 'SCHOOL_ADMIN',
    },
  });

  const onSubmitWithStatus = async (values: FundFormValues) => {
    setIsSaving(true);
    await onSubmit(values);
    setIsSaving(false);
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
      }}
    >
      <TextInput
        control={control}
        name="title"
        inputProps={{ label: 'Tên quỹ', fullWidth: true }}
      />

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing(2),
        }}
      >
        <TextInput
          control={control}
          name="targetBalance"
          inputProps={{
            label: 'Số tiền mục tiêu',
            fullWidth: true,
            type: 'number',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">000 VNĐ</InputAdornment>
              ),
            },
          }}
        />
        <TextInput
          control={control}
          name="currentBalance"
          inputProps={{
            label: 'Số tiền hiện tại',
            fullWidth: true,
            type: 'number',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">000 VNĐ</InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <RichTextInput
        control={control}
        name="description"
        inputProps={{ placeholder: 'Mô tả' }}
      />

      <Box sx={{ width: '100%' }}>
        <TextInput
          control={control}
          name="location"
          inputProps={{ label: 'Địa điểm', fullWidth: true }}
        />
        <Checkbox
          control={control}
          name="isOffline"
          inputProps={{ label: 'Tổ chức gây quỹ offline' }}
        />
      </Box>

      <DateTimeInput
        control={control}
        name="startTime"
        inputProps={{
          fullWidth: true,
          label: 'Thời gian bắt đầu',
        }}
      />

      <Box sx={{ width: '100%' }}>
        <DateTimeInput
          control={control}
          name="endTime"
          inputProps={{
            fullWidth: true,
            label: 'Thời gian kết thúc',
          }}
        />{' '}
        <Checkbox
          control={control}
          name="isEnded"
          inputProps={{ label: 'Sự kiện đã kết thúc' }}
        />
      </Box>

      {/* <Box sx={{ width: '100%' }}>
        <SelectInput
          control={control}
          name="publicity"
          inputProps={{
            fullWidth: true,
            label: 'Ai có thể nhìn thấy và tham gia sự kiện này',
          }}
          options={[
            {
              value: 'ALUMNI',
              name: 'Chỉ bạn nhìn thấy',
            },
            {
              value: 'CLASS_MOD',
              name: 'Chỉ người cùng lớp',
            },
            {
              value: 'GRADE_MOD',
              name: 'Chỉ người cùng niên khoá',
            },
            {
              value: 'SCHOOL_ADMIN',
              name: 'Bất cứ ai',
            },
          ]}
        />
        <Checkbox
          control={control}
          name="publicParticipant"
          inputProps={{ label: 'Công khai danh sách người tham gia?' }}
        />

        <Typography variant="body2">
          Lưu ý*: Sự kiện của bạn sẽ được gửi đến ban đại diện của trường để
          kiểm duyệt. Sau khi được bạn đại diện chấp nhận, người khác mới có thể
          nhìn thấy và tham gia sự kiện của bạn.
        </Typography>
      </Box> */}

      <Button
        variant="contained"
        disabled={isSaving}
        onClick={handleSubmit(onSubmitWithStatus)}
      >
        Lưu
      </Button>
    </Box>
  );
};

export default FundForm;
