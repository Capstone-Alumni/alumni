import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Job } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';
import RichTextInput from '@share/components/form/RichTextInput';
import SelectInput from '@share/components/form/SelectInput';
import EditorPreview from '@share/components/editor/EditorPreview';

const JOB_LIST = [
  'Công nghệ thông tin',
  'Y tế và chăm sóc sức khỏe',
  'Kế toán và tài chính',
  'Kinh doanh và quản lý',
  'Marketing và quảng cáo',
  'Giáo dục và đào tạo',
  'Luật sư và tư vấn pháp lý',
  'Kỹ thuật cơ khí và điện tử',
  'Kiến trúc và xây dựng',
  'Thiết kế đồ họa và truyền thông',
  'Khoa học dữ liệu và phân tích',
  'Khoa học môi trường và năng lượng',
  'Nghệ thuật và giải trí',
  'Du lịch và khách sạn',
  'Logistics và vận chuyển',
  'Thực phẩm và nông nghiệp',
  'Thời trang và làm đẹp',
  'Thương mại điện tử và bán lẻ trực tuyến',
  'Tư vấn và quản lý nhân sự',
  'Điều hành và quản lý chuỗi cung ứng',
  'Khác',
];

const JOB_TYPES = [
  'Toàn thời gian',
  'Bán thời gian',
  'Làm việc tại nhà',
  'Hybrid',
  'Thời vụ',
  'Việc làm theo ca',
  'Làm việc cộng đồng',
  'Khác',
];

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
        name="title"
        inputProps={{
          label: 'Tiêu đề tuyển dụng',
          fullWidth: true,
          disabled: isPreview,
        }}
      />
      <TextInput
        control={control}
        name="companyName"
        inputProps={{
          label: 'Tên công ty',
          fullWidth: true,
          disabled: isPreview,
        }}
      />

      {isPreview ? (
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="caption"
            sx={{ marginLeft: '16px', color: '#919EAB' }}
          >
            Mô tả công việc
          </Typography>
          <Box
            sx={{
              width: '100%',
              border: '1px solid rgba(145, 158, 171, 0.24)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <EditorPreview value={getValues('description') || ''} />
          </Box>
        </Box>
      ) : (
        <RichTextInput
          control={control}
          name="description"
          inputProps={{ placeholder: 'Mô tả' }}
        />
      )}
      {isPreview ? (
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="caption"
            sx={{ marginLeft: '16px', color: '#919EAB' }}
          >
            Hình công ty
          </Typography>
          <Box
            sx={{
              width: '100%',
              border: '1px solid rgba(145, 158, 171, 0.24)',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <img
              src={getValues('companyImageUrl')}
              height="auto"
              style={{ objectFit: 'contain', width: 'auto' }}
            />{' '}
          </Box>
        </Box>
      ) : (
        <UploadBackgroundInput
          control={control}
          name="companyImageUrl"
          inputProps={{ label: 'Hình công ty' }}
          containerSx={{ width: '100%' }}
        />
      )}
      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
        <SelectInput
          control={control}
          name="job"
          inputProps={{
            fullWidth: true,
            label: 'Ngành nghề cần tuyển',
            disabled: isPreview,
          }}
          options={JOB_LIST.map(job => ({
            name: job,
            value: job,
          }))}
        />
        <TextInput
          control={control}
          name="position"
          inputProps={{ label: 'Vị trí', fullWidth: true, disabled: isPreview }}
        />
      </Box>

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
        <SelectInput
          control={control}
          name="type"
          inputProps={{
            fullWidth: true,
            label: 'Loại hình làm việc',
            disabled: isPreview,
          }}
          options={JOB_TYPES.map(type => ({
            name: type,
            value: type,
          }))}
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
      {!isPreview && (
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