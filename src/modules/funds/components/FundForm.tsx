import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Fund } from '../types';
import TextInput from '@share/components/form/TextInput';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  useTheme,
} from '@mui/material';
// import SelectInput from '@share/components/form/SelectInput';
// import { Typography } from '@mui/material';
import { useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';
import CurrencyInput from '@share/components/CurrencyInput';
import { useRouter } from 'next/navigation';
import DateTimeInput from '@share/components/form/DateTimeInput';

export type FundFormValues = {
  title: string;
  description?: string;
  backgroundImage?: string;
  startTime?: Date;
  endTime: Date;
  targetBalance: number;
};

const validationSchema = yup.object({
  title: yup.string().required('Bắt buộc'),
  startTime: yup.date(),
  endTime: yup
    .date()
    .required('End time is required')
    .test(
      'is-greater',
      'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      function (value) {
        const { startTime } = this.parent;
        return startTime && value && value > startTime;
      },
    ),
  targetBalance: yup.number().required('Bắt buộc'),
});

const FundForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: Fund;
  onSubmit: (values: FundFormValues) => Promise<void>;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isPublicNow, setIsPublicNow] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      title: initialData?.title ?? '',
      backgroundImage: initialData?.backgroundImage ?? '',
      description: initialData?.description,
      startTime: initialData?.startTime
        ? new Date(initialData.startTime)
        : new Date(),
      endTime: initialData?.endTime
        ? new Date(initialData.endTime)
        : new Date(),
      targetBalance: initialData?.targetBalance ?? 100000,
    },
  });

  const onSubmitWithStatus = async (values: FundFormValues) => {
    setIsSaving(true);
    await onSubmit({
      ...values,
      startTime: isPublicNow ? new Date() : values.startTime,
    });
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

      <CurrencyInput
        control={control}
        name="targetBalance"
        inputProps={{
          placeholder: 'Số tiền mục tiêu',
          label: 'Số tiền mục tiêu',
        }}
      />
      <UploadBackgroundInput
        control={control}
        name="backgroundImage"
        inputProps={{ label: 'Hình ảnh đại diện bài gây quỹ' }}
        containerSx={{ width: '100%' }}
      />

      <RichTextInput
        control={control}
        name="description"
        inputProps={{
          placeholder: 'Mô tả thông tin quỹ',
          containerSx: { width: '100%' },
        }}
      />

      <Box sx={{ width: '100%' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPublicNow}
              onChange={() => setIsPublicNow(!isPublicNow)}
            />
          }
          label="Cho phép ủng hộ ngay từ bây giờ."
        />
      </Box>

      <Stack direction="row" gap={2} sx={{ width: '100%' }}>
        {isPublicNow ? null : (
          <DateTimeInput
            control={control}
            name="startTime"
            inputProps={{
              label: 'Thời gian bắt đầu',
              fullWidth: true,
            }}
          />
        )}

        <DateTimeInput
          control={control}
          name="endTime"
          inputProps={{
            label: 'Thời gian kết thúc',
            fullWidth: true,
          }}
        />
      </Stack>

      <Box
        sx={{
          display: 'flex',
          gap: '5px',
        }}
      >
        <Button variant="outlined" onClick={() => router.back()}>
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={isSaving}
          onClick={handleSubmit(onSubmitWithStatus)}
        >
          {initialData ? 'Lưu' : 'Tạo'}
        </Button>
      </Box>
    </Box>
  );
};

export default FundForm;
