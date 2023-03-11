import { AccessLevel } from '@prisma/client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Fund } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, InputAdornment, useTheme } from '@mui/material';
import DateTimeInput from '@share/components/form/DateTimeInput';
// import SelectInput from '@share/components/form/SelectInput';
// import { Typography } from '@mui/material';
import { useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';
import RadioInput from '@share/components/form/RadioInput';

export type FundFormValues = {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  targetBalance: number;
  publicity: AccessLevel;
};

const validationSchema = yup.object({
  title: yup.string().required(),
  startTime: yup.date().required(),
  endTime: yup.date().required(),
  publicity: yup.string().required(),
  targetBalance: yup.number().required(),
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
      startTime: initialData?.startTime
        ? new Date(initialData.startTime)
        : new Date(),
      endTime: initialData?.endTime
        ? new Date(initialData.endTime)
        : new Date(),
      isEnded: initialData?.isEnded,
      targetBalance: initialData?.targetBalance ?? 100000,
      publicity: initialData?.publicity ?? 'ALUMNI',
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

      <TextInput
        control={control}
        name="targetBalance"
        inputProps={{
          label: 'Số tiền mục tiêu',
          fullWidth: true,
          type: 'number',
          InputProps: {
            endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>,
          },
        }}
      />

      <RichTextInput
        control={control}
        name="description"
        inputProps={{ placeholder: 'Mô tả', containerSx: { width: '100%' } }}
      />

      <DateTimeInput
        control={control}
        name="startTime"
        inputProps={{
          fullWidth: true,
          label: 'Thời gian bắt đầu',
        }}
      />

      <DateTimeInput
        control={control}
        name="endTime"
        inputProps={{
          fullWidth: true,
          label: 'Thời gian kết thúc',
        }}
      />

      <Box sx={{ width: '100%' }}>
        <RadioInput
          control={control}
          name="publicity"
          inputProps={{
            label: 'Cho phép mọi người nhìn thấy và ủng hộ?',
          }}
          options={[
            {
              value: 'ALUMNI',
              name: 'Không, chưa sẵn sàng nhận ủng hộ',
            },
            {
              value: 'SCHOOL_ADMIN',
              name: 'Có, đã sẵn sàng nhận ủng hộ',
            },
          ]}
        />
      </Box>

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
