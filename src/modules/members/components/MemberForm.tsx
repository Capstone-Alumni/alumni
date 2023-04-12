/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';

import * as yup from 'yup';
import {
  emailValidator,
  requiredFullNameValidator,
} from '@share/utils/validators';

import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Member } from '../types';
import TextInput from '@share/components/form/TextInput';
import DateInput from '@share/components/form/DateInput';
import AutocompleteInput from '@share/components/form/AutoCompleteInput';
import useGetGradeList from 'src/modules/gradeAndClass/hooks/useGetGradeList';
import { useSetRecoilState } from 'recoil';
import { getGradeListParamsAtom } from 'src/modules/gradeAndClass/state';
import { Icon } from '@iconify/react';
import useGetClassListV2 from 'src/modules/gradeAndClass/hooks/useGetClassListV2';

export type MemberFormValues = {
  fullName: string;
  gradeClass: Array<{
    grade: Array<{ id: string; value: string; label: string }>;
    alumClass: Array<{ id: string; value: string; label: string }>;
  }>;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  facebook?: string;
  zalo?: string;
};

const validationSchema = yup.object({
  fullName: requiredFullNameValidator,
  gradeClass: yup.array(),
  email: emailValidator,
  phone: yup.string(),
  facebook: yup.string(),
  zalo: yup.string(),
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

  const resolver = useYupValidateionResolver(validationSchema);

  const methods = useForm({
    defaultValues: {
      dateOfBirth: null,
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

  const onSubmitHandler = async (values: MemberFormValues) => {
    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    // onClose?.();
  };

  return (
    <FormProvider {...methods}>
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
        {/* <Box sx={{ width: '100%' }}>
        <Typography variant="h6">
          {initialData
            ? 'Chỉnh sửa thông tin thành viên'
            : 'Thêm thành viên mới'}
        </Typography>
      </Box> */}

        <Box sx={{ width: '100%' }}>
          <Typography variant="h6">Thông tin cơ bản</Typography>
        </Box>

        <TextInput
          control={control}
          name="fullName"
          inputProps={{
            label: 'Họ và tên (bắt buộc)',
            sx: {
              width: '100%',
            },
          }}
        />

        <TextInput
          control={control}
          name="email"
          inputProps={{
            label: 'Email',
            sx: {
              width: '100%',
            },
          }}
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

        <TextInput
          control={control}
          name="facebook"
          inputProps={{
            label: 'Facebook',
            sx: {
              width: '100%',
            },
          }}
        />

        <GradeClassForm />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: theme.spacing(2),
            mt: 3,
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
            {initialData ? 'Lưu' : 'Thêm'}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

const GradeClassForm = () => {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'gradeClass', // unique name for your Field Array
  });
  const gradeClassWatcher = watch('gradeClass');

  const { data: classList, getClassList } = useGetClassListV2();
  const { data: gradeList, isLoading: isLoadingGrade } = useGetGradeList();
  const setParams = useSetRecoilState(getGradeListParamsAtom);

  useEffect(() => {
    setParams(() => ({ page: 1, limit: 999, inviteMode: true }));
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: '100%', mt: 2 }}
      >
        <Typography variant="h6">Niên khoá và lớp</Typography>
        <Button
          size="small"
          type="button"
          variant="outlined"
          onClick={() => {
            append({ gradeYear: [], alumClass: [] });
          }}
        >
          Thêm
        </Button>
      </Stack>

      {fields.map((item, index) => {
        return (
          <Stack key={item.id} direction="row" gap={1} sx={{ width: '100%' }}>
            <AutocompleteInput
              control={control}
              name={`gradeClass[${index}].grade`}
              textProps={{
                label: 'Niên khoá',
                size: 'medium',
              }}
              inputProps={{
                sx: {
                  width: '100%',
                },
              }}
              options={
                gradeList
                  ? gradeList?.data.items.map(grade => ({
                      id: grade.id,
                      label: `${grade.startYear} - ${grade.endYear}`,
                      value: grade.id,
                    }))
                  : []
              }
              isLoadingOptions={isLoadingGrade}
              valueChangeCallback={(grade: any) => {
                console.log(grade);
                getClassList({ gradeId: grade?.id, name: '' });
                setValue(`gradeClass[${index}].alumClass`, []);
              }}
            />

            <AutocompleteInput
              control={control}
              name={`gradeClass[${index}].alumClass`}
              textProps={{
                label: 'Lớp',
                size: 'medium',
              }}
              inputProps={{
                multiple: true,
                sx: {
                  width: '100%',
                },
              }}
              options={
                classList
                  ? classList?.data.items.map(cl => ({
                      id: cl.id,
                      label: cl.name,
                      value: cl.id,
                    }))
                  : []
              }
            />

            <IconButton
              type="button"
              disabled={gradeClassWatcher.length === 1}
              onClick={() => remove(index)}
            >
              <Icon height={24} icon="ic:baseline-remove-circle" />
            </IconButton>
          </Stack>
        );
      })}
    </>
  );
};

export default MemberForm;
