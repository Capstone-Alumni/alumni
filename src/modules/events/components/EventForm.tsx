import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Event } from '../types';
import TextInput from '@share/components/form/TextInput';
import { Box, Button, useTheme } from '@mui/material';
import Checkbox from '@share/components/form/Checkbox';
import DateTimeInput from '@share/components/form/DateTimeInput';
import { useEffect, useState } from 'react';
import RichTextInput from '@share/components/form/RichTextInput';
import UploadBackgroundInput from '@share/components/form/UploadBackgroundInput';
import RadioInput from '@share/components/form/RadioInput';
import { useRouter } from 'next/navigation';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';
import AutocompleteInput from '@share/components/form/AutoCompleteInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getGradeListParamsAtom } from 'src/modules/gradeAndClass/state';
import { currentUserInformationDataAtom } from '@share/states';
import { getGradeLongName } from '@share/utils/getGradeName';

export type EventFormValues = {
  title: string;
  backgroundImage: string;
  description?: string;
  isOffline: boolean;
  location?: string;
  startTime: Date;
  endTime: Date;
  gradeId?: string;
  grade: {
    id: string;
  };
  publicParticipant: boolean;
};

export type InternalFormValues = Omit<EventFormValues, 'isOffline'> & {
  isOffline: 'true' | 'false';
};

const validationSchema = yup.object({
  title: yup.string().required('Bắt buộc'),
  startTime: yup.date().required(),
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
});

const EventForm = ({
  initialData,
  onSubmit,
}: {
  initialData?: Event;
  onSubmit: (values: EventFormValues) => Promise<void>;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const currentUser = useRecoilValue(currentUserInformationDataAtom);

  const resolver = useYupValidateionResolver(validationSchema);

  const { control, handleSubmit } = useForm({
    resolver,
    defaultValues: {
      backgroundImage: initialData?.backgroundImage ?? '',
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      isOffline: initialData?.isOffline ?? false,
      location: initialData?.location,
      startTime: initialData?.startTime
        ? new Date(initialData.startTime)
        : new Date(),
      endTime: initialData?.endTime
        ? new Date(initialData.endTime)
        : new Date(),
      grade: initialData?.grade
        ? {
            id: initialData.gradeId,
            label: getGradeLongName(initialData.grade),
            value: initialData.gradeId,
          }
        : {
            id: 'all',
            label: 'Tất cả',
            value: 'all',
          },
      publicParticipant: initialData?.publicParticipant ?? false,
    },
  });

  const { data: gradeList, isLoading: isLoadingGrade } = useGetGradeList();
  const setParams = useSetRecoilState(getGradeListParamsAtom);

  useEffect(() => {
    setParams(() => ({ page: 1, limit: 999, alumniId: currentUser?.id }));
  }, []);

  const onSubmitWithStatus = async (values: InternalFormValues) => {
    setIsSaving(true);
    await onSubmit({
      ...values,
      isOffline: values.isOffline === 'true',
      gradeId: values.grade.id,
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
      <UploadBackgroundInput
        control={control}
        name="backgroundImage"
        inputProps={{ label: 'Hình nền sự kiện' }}
        containerSx={{ width: '100%' }}
      />

      <TextInput
        control={control}
        name="title"
        inputProps={{ label: 'Tên sự kiện', fullWidth: true }}
      />

      <RadioInput
        control={control}
        name="isOffline"
        inputProps={{ label: 'Hình thức tổ chức' }}
        containerSx={{ width: '100%' }}
        options={[
          { value: 'false', name: 'Online' },
          { value: 'true', name: 'Offline' },
        ]}
      />

      <TextInput
        control={control}
        name="location"
        inputProps={{ label: 'Địa điểm / Link tham dự', fullWidth: true }}
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

      <Box sx={{ width: '100%' }}>
        <DateTimeInput
          control={control}
          name="endTime"
          inputProps={{
            fullWidth: true,
            label: 'Thời gian kết thúc',
          }}
        />
      </Box>

      <Box sx={{ width: '100%' }}>
        {/* <SelectInput
          control={control}
          name="gradeId"
          inputProps={{
            fullWidth: true,
            label: 'Dành cho niên khoá',
          }}
          options={[
            {
              value: 'all',
              name: 'Tất cả',
            },
            {
              value: 'GRADE_MOD',
              name: 'Chỉ người cùng niên khoá',
            },
            {
              value: 'SCHOOL_ADMIN',
              name: 'Tất cả mọi người',
            },
          ]}
        /> */}

        <AutocompleteInput
          control={control}
          name="grade"
          textProps={{
            label: 'Danh cho niên khoá',
            size: 'medium',
          }}
          inputProps={{
            sx: {
              width: '100%',
            },
          }}
          options={
            gradeList
              ? [
                  {
                    id: 'all',
                    label: 'Tất cả',
                    value: 'all',
                  },
                ].concat(
                  gradeList?.data.items.map(grade => ({
                    id: grade.id,
                    label: `${grade.code ? grade.code + ': ' : ''}${
                      grade.startYear
                    } - ${grade.endYear}`,
                    value: grade.id,
                  })),
                )
              : [
                  {
                    id: 'all',
                    label: 'Tất cả',
                    value: 'all',
                  },
                ]
          }
          isLoadingOptions={isLoadingGrade}
        />

        <Checkbox
          control={control}
          name="publicParticipant"
          inputProps={{ label: 'Công khai danh sách người tham gia?' }}
        />

        {/* <Typography variant="body2" color={'red'}>
          Lưu ý*: Sự kiện của bạn sẽ được gửi đến ban đại diện của trường để
          kiểm duyệt. Sau khi được bạn đại diện chấp nhận, người khác mới có thể
          nhìn thấy và tham gia sự kiện của bạn.
        </Typography> */}
      </Box>

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
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default EventForm;
