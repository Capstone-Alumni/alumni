import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';
import { Grade } from '../types';
import DateInput from '@share/components/form/DateInput';
import { CreateGradeParams } from '../hooks/useCreateGrade';

export type GradeFormValues = {
  code: string;
  startYear: Date;
  endYear: Date;
};

const validationSchema = yup.object({
  code: yup.string(),
  startYear: yup.date().required('Bắt buộc'),
  endYear: yup.date().required('Bắt buộc'),
});

const GradeForm = ({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: Grade;
  onClose?: () => void;
  onSubmit: (values: CreateGradeParams) => void;
}) => {
  const theme = useTheme();
  const [submitting, setSubmitting] = useState(false);

  const resolver = useYupValidateionResolver(validationSchema);

  const getStartYear = (date: Date) => {
    const startDate = new Date(date).setFullYear(date.getFullYear() - 3);
    return new Date(startDate);
  };

  const getEndYear = (date: Date) => {
    const endDate = new Date(date).setFullYear(date.getFullYear() + 3);
    return new Date(endDate);
  };

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      code: initialData?.code ?? '',
      startYear: initialData?.startYear
        ? new Date(initialData.startYear.toString())
        : getStartYear(new Date()),
      endYear: initialData?.endYear
        ? new Date(initialData.endYear.toString())
        : new Date(),
    },
    resolver,
  });

  const startYearWatcher = watch('startYear');

  useEffect(() => {
    const date = getEndYear(startYearWatcher);
    setValue('endYear', date);
  }, [startYearWatcher]);

  const onSubmitHandler = async (values: GradeFormValues) => {
    setSubmitting(true);
    const formattedValue = {
      code: values.code,
      startYear: values.startYear.getFullYear(),
      endYear: values.endYear.getFullYear(),
    };
    await onSubmit(formattedValue);
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
          {initialData ? 'Chỉnh sửa thông tin niên khoá' : 'Thêm niên khoá mới'}
        </Typography>
      </Box>

      <Controller
        control={control}
        name="code"
        render={({ field }) => (
          <TextField fullWidth label="Mã khoá (Không bắt buộc)" {...field} />
        )}
      />

      <Stack
        direction={{ md: 'row', sm: 'column' }}
        gap={2}
        sx={{ width: '100%' }}
      >
        <DateInput
          control={control}
          name="startYear"
          inputProps={{
            label: 'Năm bắt đầu',
            views: ['year'],
          }}
          textProps={{
            sx: {
              width: '100%',
            },
          }}
        />

        <DateInput
          control={control}
          name="endYear"
          inputProps={{
            label: 'Năm kết thúc',
            views: ['year'],
            fullWidth: true,
          }}
          textProps={{
            sx: {
              width: '100%',
            },
          }}
        />
      </Stack>

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
          {initialData ? 'Lưu' : 'Thêm'}
        </Button>
      </Box>
    </Box>
  );
};

export default GradeForm;
