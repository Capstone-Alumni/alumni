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
import { UserManager } from '../../../type';

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
  isEdit: boolean;
  currentUser?: UserManager;
};

export default function UserNewForm({ isEdit, currentUser }: UserNewFormProps) {
  const [careers, setCareers] = useState<Array<{ id: string }>>([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]);
  const [educations, setEducations] = useState<Array<{ id: string }>>([
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]);

  const NewUserSchema = Yup.object().shape({
    bio: Yup.string().required('Bio is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    class: Yup.string().required('Class is required'),
    grade: Yup.string().required('Grade is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    dateOfBirth: Yup.date().required('Date is required'),
    address: Yup.string().required('Address is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bio: currentUser?.bio || '',
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      class: currentUser?.class || '',
      grade: currentUser?.grade || '',
      phoneNumber: currentUser?.phoneNumber || '',
      dateOfBirth: currentUser?.dateOfBirth || dayjs('2022-04-07'),
      address: currentUser?.address || '',
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        // TODO: Call API to submit the form
        // await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        // enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
      } catch (error: any) {
        console.error(error);
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

  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue],
  );

  const handleDeleteJob = (id: string) => {
    setCareers(careers.filter((career) => career.id !== id));
  };

  const handleDeleteEducation = (id: string) => {
    setEducations(educations.filter((education) => education.id !== id));
  };

  const handleAddNewJob = () => {
    setCareers([...careers, { id: String(careers.length + 1) }]);
  };

  const handleAddNewEducation = () => {
    setEducations([...educations, { id: String(careers.length + 1) }]);
  };

  const handleRenderCareers = (careers: Array<{ id: string }>) => {
    return careers.map((career: any) => {
      return (
        <Stack spacing={2} key={career.id}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '13px',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteJob(career.id) as any}
            >
              Delete
            </Typography>
          </div>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 2 }}
          >
            <TextField
              fullWidth
              label="Company Name"
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Title"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 2 }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="Start Date"
                openTo="year"
                views={['year', 'month', 'day']}
                {...getFieldProps('dateOfBirth')}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              <DatePicker
                disableFuture
                label="End Date"
                openTo="year"
                views={['year', 'month', 'day']}
                {...getFieldProps('dateOfBirth')}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <hr />
        </Stack>
      );
    });
  };

  const handleRenderEducation = (careers: Array<{ id: string }>) => {
    return educations.map((education: any) => {
      return (
        <Stack spacing={2} key={education.id}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: '13px',
                color: 'red',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => handleDeleteEducation(education.id) as any}
            >
              Delete
            </Typography>
          </div>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 2 }}
          >
            <TextField
              fullWidth
              label="School Name"
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              label="Degree"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 2 }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disableFuture
                label="Start Date"
                openTo="year"
                views={['year', 'month', 'day']}
                {...getFieldProps('dateOfBirth')}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              <DatePicker
                disableFuture
                label="End Date"
                openTo="year"
                views={['year', 'month', 'day']}
                {...getFieldProps('dateOfBirth')}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <hr />
        </Stack>
      );
    });
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack sx={{ marginBottom: '1.5rem' }}>
                <Typography variant="h5">Your infomation(s)</Typography>
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
                    label="Full Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
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
                    renderInput={(params) => (
                      <TextField {...params} label="Class" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    options={gradesMock}
                    renderInput={(params) => (
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
                    {...getFieldProps('phoneNumber')}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      label="Date of Birth"
                      openTo="year"
                      views={['year', 'month', 'day']}
                      {...getFieldProps('dateOfBirth')}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Stack>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                </Stack>
              </Stack>
              <br />
              <br />
              <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
                <Typography variant="h5">Your career(s)</Typography>
              </Stack>
              <Stack spacing={3}>
                {handleRenderCareers(careers)}
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleAddNewJob() as any}
                  >
                    Add new job
                  </Button>
                </Box>
              </Stack>
              <Stack sx={{ margin: '2rem 0 0.5rem 0' }}>
                <Typography variant="h5">Your education(s)</Typography>
              </Stack>
              <Stack spacing={3}>
                {handleRenderEducation(educations)}
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleAddNewEducation() as any}
                  >
                    Add new education
                  </Button>
                </Box>
                <Box
                  sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {!isEdit ? 'Create User' : 'Save Changes'}
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
