'use client';

import * as yup from 'yup';

import { FormProvider, useForm } from 'react-hook-form';

import { Paper, Stack } from '@mui/material';

import {
  requiredFullNameValidator,
  requiredGradeNClassValidator,
} from 'src/modules/share/utils/validators';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

import VeriticalLinearStepper from './VerticalLinearStepper';
import VerifyForm from './VerifyForm';
import GradeStep from './GradeStep';
import ClassStep from './ClassStep';

type VerifyFormValues = {
  fullName: string;
  grade: string;
  class: string;
};

const validationSchema = yup
  .object({
    fullName: requiredFullNameValidator,
    grade: requiredGradeNClassValidator,
    class: requiredGradeNClassValidator,
  })
  .required();

export const steps = [
  {
    label: 'Thông tin cơ bản',
    optional: false,
    component: <VerifyForm />,
  },
  {
    label: 'Chọn khối',
    optional: false,
    component: <GradeStep />,
  },
  {
    label: 'Chọn lớp',
    optional: false,
    component: <ClassStep />,
  },
];

const VerifyAccountPage = () => {
  const resolver = useYupValidateionResolver(validationSchema);

  const methods = useForm<VerifyFormValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      grade: '',
      class: '',
    },
    resolver,
  });

  return (
    <Stack spacing={1}>
      <Paper
        sx={{
          width: '100%',
          boxShadow: theme => theme.customShadows.z8,
        }}
      >
        <FormProvider {...methods}>
          <VeriticalLinearStepper steps={steps} />
        </FormProvider>
      </Paper>
    </Stack>
  );
};

export default VerifyAccountPage;
