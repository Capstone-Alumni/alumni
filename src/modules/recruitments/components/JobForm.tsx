import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Job } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';
import RichTextInput from '@share/components/form/RichTextInput';
import SelectInput from '@share/components/form/SelectInput';
import EditorPreview from '@share/components/editor/EditorPreview';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';

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

const YEARS_OF_EXPERIENCE_LIST = [
  'Dưới 1 năm',
  '1 năm',
  '2 năm',
  '3 năm',
  '4 năm',
  'Trên 5 năm',
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
  yearsOfExperience?: string;
};

const validationSchema = yup.object({
  title: yup.string().required('Tiêu đề công việc không được để trống'),
  companyName: yup.string().required('Tên công ty không được để trống'),
  description: yup.string().required('Mô tả công việc không được để trống'),
  position: yup.string().required('Vị trí công việc không được để trống'),
  job: yup.string().required('Tên công việc không được để trống'),
  website: yup.string(),
  address: yup.string().required('Địa chỉ công ty không được để trống'),
  type: yup.string().required('Loại hình làm việc không được để trống'),
  salary: yup.string().required('Mức lương công việc không được để trống'),
  yearsOfExperience: yup
    .string()
    .required('Yêu cầu kinh nghiệm không được để trống'),
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
  const theme = useTheme();
  const router = useRouter();

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit, getValues, formState } = useForm({
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
      yearsOfExperience: initialData?.yearsOfExperience,
    },
  });

  const { isSubmitting } = formState;

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
      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
        <TextInput
          control={control}
          name="position"
          inputProps={{
            label: 'Vị trí cần tuyển',
            fullWidth: true,
            disabled: isPreview,
          }}
        />
        <SelectInput
          control={control}
          name="yearsOfExperience"
          inputProps={{
            fullWidth: true,
            label: 'Yêu cầu kinh nghiệm',
            disabled: isPreview,
          }}
          options={YEARS_OF_EXPERIENCE_LIST.map((yoe) => ({
            name: yoe,
            value: yoe,
          }))}
        />
      </Box>
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
          inputProps={{ placeholder: 'Mô tả công việc' }}
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
          options={JOB_LIST.map((job) => ({
            name: job,
            value: job,
          }))}
        />
      </Box>
      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
        <SelectInput
          control={control}
          name="type"
          inputProps={{
            fullWidth: true,
            label: 'Loại hình làm việc',
            disabled: isPreview,
          }}
          options={JOB_TYPES.map((type) => ({
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
      <Box sx={{ width: '100%', gap: '1rem' }} display="flex">
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
          name="companyName"
          inputProps={{
            label: 'Tên công ty',
            fullWidth: true,
            disabled: isPreview,
          }}
        />
      </Box>
      <TextInput
        control={control}
        name="address"
        inputProps={{ label: 'Địa chỉ', fullWidth: true, disabled: isPreview }}
      />
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
          inputProps={{ label: 'Hình ảnh tuyển dụng' }}
          containerSx={{ width: '100%' }}
        />
      )}
      {!isPreview && (
        <>
          {/* <Box sx={{ width: '100%' }}>
            <Typography variant="body2" color={'red'}>
              Lưu ý*: Công việc bạn đăng của bạn sẽ được gửi đến ban đại diện
              của trường để kiểm duyệt. Sau khi được bạn đại diện chấp nhận,
              người khác mới có thể nhìn thấy, xem cũng như nộp hồ sơ cho bạn.
            </Typography>
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: theme.spacing(1),
            }}
          >
            <Button
              variant="outlined"
              disabled={isSubmitting}
              onClick={() => router.back()}
            >
              Huỷ
            </Button>

            <LoadingButton
              type="submit"
              variant="contained"
              onClick={handleSubmit(onSubmit as any)}
              loading={isSubmitting}
            >
              Lưu
            </LoadingButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default JobForm;
