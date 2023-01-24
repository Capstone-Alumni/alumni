import { useState } from 'react';

import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';
// material
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import useYupValidationResolver from '@share/utils/useYupValidationResolver';
import { requiredFullNameValidator } from '@share/utils/validators';

// ----------------------------------------------------------------------
interface EditProfileFormProps {
  onClose: () => void;
  onSubmit?: () => void;
}

const validationSchema = yup
  .object({
    fullname: requiredFullNameValidator,
  })
  .required();

export default function EditProfileForm({
  onClose,
  onSubmit,
}: EditProfileFormProps) {
  const resolver = useYupValidationResolver(validationSchema);

  const { control, handleSubmit } = useForm<{ fullname: string }>({
    mode: 'onChange',
    defaultValues: {
      fullname: 'Gia An',
    },
    resolver,
  });

  const onSubmitForm = async () => {
    // await signUp(values);
  };

  return (
    <>
      <DialogTitle>Edit your information</DialogTitle>
      <DialogContent>
        <Stack sx={{ py: 1 }}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </Stack>
        <Stack sx={{ py: '0.25rem' }}>
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Họ và tên *"
                {...field}
                error={Boolean(error?.message)}
                helperText={error?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
        </Stack>
        <Stack sx={{ py: '0.25rem' }}>
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Họ và tên *"
                {...field}
                error={Boolean(error?.message)}
                helperText={error?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
        </Stack>
        <Stack sx={{ py: '0.25rem' }}>
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Họ và tên *"
                {...field}
                error={Boolean(error?.message)}
                helperText={error?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
        </Stack>
        <Stack sx={{ py: '0.25rem' }}>
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <TextField
                fullWidth
                label="Họ và tên *"
                {...field}
                error={Boolean(error?.message)}
                helperText={error?.message}
                sx={{ mb: 3 }}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={onSubmitForm} variant="contained">
          Subscribe
        </Button>
      </DialogActions>
    </>
  );
}
