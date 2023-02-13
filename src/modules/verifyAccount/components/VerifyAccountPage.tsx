'use client';

import * as yup from 'yup';

import { FormProvider, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';

import {
  requiredFullNameValidator,
  requiredGradeNClassValidator,
} from 'src/modules/share/utils/validators';
import useYupValidateionResolver from 'src/modules/share/utils/useYupValidationResolver';

import VeriticalLinearStepper from './VerticalLinearStepper';
import VerifyForm from './VerifyForm';
import GradeStep from './GradeStep';
import ClassStep from './ClassStep';
import useVerifyAccount from '../hooks/useVerifyAccount';
import { useSession } from 'next-auth/react';
import { AccessRequest } from '../types';

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

const VerifyAccountPage = ({
  initialData,
}: {
  initialData: AccessRequest | undefined;
}) => {
  const resolver = useYupValidateionResolver(validationSchema);

  const methods = useForm<VerifyFormValues>({
    mode: 'onChange',
    defaultValues: {
      fullName: initialData?.fullName ?? '',
      grade: initialData?.gradeId ?? '',
      class: initialData?.alumClassId ?? '',
    },
    resolver,
  });

  const { data: session } = useSession();
  const { verifyAccount } = useVerifyAccount();

  const onSubmit = async (values: VerifyFormValues) => {
    if (!session?.user.id) {
      return;
    }

    await verifyAccount({
      userId: session.user.id,
      fullName: values.fullName,
      classId: values.class,
      email: session.user.email,
      gradeId: values.grade,
    });
  };

  return (
    <Paper
      sx={{
        width: '100%',
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <VeriticalLinearStepper steps={steps} />
        </form>
      </FormProvider>
    </Paper>
  );
};

export default VerifyAccountPage;