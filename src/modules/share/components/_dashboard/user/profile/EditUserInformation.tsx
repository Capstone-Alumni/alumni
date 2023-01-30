import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';

// material
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { LoadingButton } from '@mui/lab';
// @types
import { UserInformation } from '../../../../type';
import { useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';

// ----------------------------------------------------------------------

const classesMock = [
  { label: '12A3', class: '12A3' },
  { label: '12A4', class: '12A4' },
  { label: '12A7', class: '12A7' },
  { label: '12A8', class: '12A8' },
  { label: '12A2', class: '12A2' },
];

const gradesMock = [
  { label: '2015', class: '2015' },
  { label: '2016', class: '2016' },
  { label: '2017', class: '2017' },
  { label: '2018', class: '2018' },
  { label: '2019', class: '2019' },
];

type UserNewFormProps = {
  currentUser?: UserInformation;
};

export default function EditUserInformation({ currentUser }: UserNewFormProps) {
  const [updateUserInformation, result] = useUpdateUserInformationMutation();

  const NewUserSchema = Yup.object().shape({
    bio: Yup.string(),
    userEmail: Yup.string(),
    className: Yup.string().nullable(),
    gradeName: Yup.string().nullable(),
    phoneNumber: Yup.string(),
    // dateOfBirth: Yup.date().required('Date is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: currentUser?.userId || '',
      bio: currentUser?.bio || '',
      userEmail: currentUser?.userEmail || '',
      className: currentUser?.className || null,
      gradeName: currentUser?.gradeName || null,
      phone: currentUser?.phone || '',
      dateOfBirth: currentUser?.dateOfBirth || null
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        await updateUserInformation(values);
        // TODO: Call API to submit the form
        // await fakeRequest(500);
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error: any) {
        console.error(error);
        resetForm();
        setSubmitting(false);
        setErrors(error);
      }
    },
  });

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
  } = formik;

  console.log(errors);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack sx={{ marginBottom: '1.5rem' }}>
                <Typography variant="h5">Your information(s)</Typography>
              </Stack>
              <Stack spacing={3}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    multiline
                    maxRows={4}
                    rows={2}
                    fullWidth
                    label="Bio"
                    {...getFieldProps('bio')}
                    error={Boolean(touched.bio && errors.bio)}
                    helperText={touched.bio && errors.bio}
                  />
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('userEmail')}
                    error={Boolean(touched.userEmail && errors.userEmail)}
                    helperText={touched.userEmail && errors.userEmail}
                  />
                </Stack>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={classesMock}
                    renderInput={params => (
                      <TextField {...params} label="Class" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={gradesMock}
                    renderInput={params => (
                      <TextField {...params} label="Grade" />
                    )}
                  />
                </Stack>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Phone Number"
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      onChange={(value) => setFieldValue("dateOfBirth", value, true)}
                      value={values.dateOfBirth}
                      renderInput={(params) => (
                        <TextField
                          error={Boolean(touched.dateOfBirth && errors.dateOfBirth)}
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                          label="Date of Birth"
                          margin="normal"
                          name="birthday"
                          fullWidth
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>
              </Stack>
              <Stack spacing={3}>
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Save Changes
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
