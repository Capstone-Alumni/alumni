import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Job } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, useTheme } from '@mui/material';
import DateTimeInput from '@share/components/form/DateTimeInput';
import { Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';

export type JobFormValues = {
  companyName: string;
  position: string;
  title: string;
  job: string;
  description: string;
  website: string;
  address: string;
  type: string;
  salary: string;
  startAt?: Date;
  expiredAt?: Date;
};

const validationSchema = yup.object({
  title: yup.string().required(),
  companyName: yup.string().required(),
  description: yup.string().required(),
  position: yup.string().required(),
  job: yup.string().required(),
  website: yup.string().required(),
  address: yup.string().required(),
  type: yup.string().required(),
  salary: yup.string().required(),
});

const JobForm = ({
  initialData,
  onSubmit,
  isPreview = false,
}: {
  initialData?: Job;
  onSubmit?: (values: JobFormValues) => Promise<void>;
  isPreview?: boolean;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit, setValue, getValues } = useForm({
    resolver,
    defaultValues: {
      companyName: initialData?.companyName ?? '',
      title: initialData?.title ?? '',
      description: initialData?.description,
      companyImageUrl: initialData?.companyImageUrl,
      position: initialData?.position,
      job: initialData?.job,
      website: initialData?.website,
      address: initialData?.address,
      type: initialData?.type,
      salary: initialData?.salary,
      startAt: initialData?.startTime
        ? new Date(initialData.startTime)
        : new Date(),
      expiredAt: initialData?.expiredAt
        ? new Date(initialData.expiredAt)
        : null,
    },
  });

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
        name="companyName"
        inputProps={{
          label: 'Tên công ty',
          fullWidth: true,
          disabled: isPreview,
        }}
      />
      <TextInput
        control={control}
        name="title"
        inputProps={{
          label: 'Tên công việc',
          fullWidth: true,
          disabled: isPreview,
        }}
      />

      <UploadBackgroundInput
        isPreview
        control={control}
        name="companyImageUrl"
        inputProps={{ label: 'Hình công ty' }}
        containerSx={{ width: '100%' }}
      />
      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
        <TextInput
          control={control}
          name="position"
          inputProps={{ label: 'Vị trí', fullWidth: true, disabled: isPreview }}
        />

        <TextInput
          control={control}
          name="job"
          inputProps={{
            label: 'Ngành nghề',
            fullWidth: true,
            disabled: isPreview,
          }}
        />
      </Box>

      <TextInput
        control={control}
        name="description"
        inputProps={{
          label: 'Mô tả',
          multiline: true,
          fullWidth: true,
          disabled: isPreview,
        }}
      />

      <TextInput
        control={control}
        name="website"
        inputProps={{
          label: 'Website công ty',
          fullWidth: true,
          disabled: isPreview,
        }}
      />
      <TextInput
        control={control}
        name="address"
        inputProps={{ label: 'Địa chỉ', fullWidth: true, disabled: isPreview }}
      />

      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
        <TextInput
          control={control}
          name="type"
          inputProps={{
            label: 'Loại hình làm việc',
            fullWidth: true,
            disabled: isPreview,
          }}
        />
        <TextInput
          control={control}
          name="salary"
          inputProps={{
            label: 'Mức lương',
            fullWidth: true,
            disabled: isPreview,
          }}
        />
      </Box>
      {!Boolean(isPreview) && (
        <>
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2">
              Lưu ý*: Công việc bạn đăng của bạn sẽ được gửi đến ban đại diện
              của trường để kiểm duyệt. Sau khi được bạn đại diện chấp nhận,
              người khác mới có thể nhìn thấy, xem cũng như nộp hồ sơ cho bạn.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disabled={isSaving}
            onClick={handleSubmit(onSubmit as any)}
          >
            Lưu
          </Button>
        </>
      )}
    </Box>
  );
};

export default JobForm;
