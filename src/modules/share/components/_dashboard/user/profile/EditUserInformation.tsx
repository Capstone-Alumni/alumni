import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
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
import axiosInstance from 'src/utils/axios';

// ----------------------------------------------------------------------

const classesMock = [
  { className: '12A3' },
  { className: '12A4' },
  { className: '12A7' },
  { className: '12A8' },
  { className: '12A2' },
];

const gradesMock = [
  { gradeCode: 'cldkmwwba0000znqpfse54wfp', gradeName: '10' },
  { gradeCode: 'cldknd6lf0004znqp7o3uet1m', gradeName: '11' },
  { gradeCode: 'cldl9rf640001zn7v52plsvt9', gradeName: '12' },
];

type UserNewFormProps = {
  currentUser?: UserInformation;
};

export default function EditUserInformation({ currentUser }: UserNewFormProps) {
  const [updateUserInformation] = useUpdateUserInformationMutation();

  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);

  console.log("classes", classes);
  console.log("grades", grades);

  const NewUserSchema = Yup.object().shape({
    bio: Yup.string(),
    userEmail: Yup.string(),
    class: Yup.object().shape({
      className: Yup.string().nullable(),
    }).nullable(),
    grade: Yup.object().shape({
      gradeName: Yup.string().nullable(),
      gradeCode: Yup.string().nullable(),
    }).nullable(),
    phoneNumber: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: currentUser?.userId || '',
      bio: currentUser?.bio || '',
      userEmail: currentUser?.userEmail || '',
      class: {
        className: currentUser?.className || null
      },
      grade: {
        gradeName: currentUser?.gradeName || null,
        gradeCode: currentUser?.gradeCode || null,
      },
      phone: currentUser?.phone || '',
      dateOfBirth: currentUser?.dateOfBirth || null
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        console.log(values);
        const data = { ...values, ...values.grade, ...values.class };
        // await updateUserInformation(data);
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

  useEffect(() => {

    if (!Boolean(grades.length > 0)) {
      handleGetGrades();
      return;
    };

    if (values?.grade?.gradeCode) {
      handleGetClasses(values.grade.gradeCode);
      return;
    } else {
      setClasses([]);
    }

  }, [values.grade])


  const handleGetClasses = async (gradeId: string | null) => {
    const res = await axiosInstance({
      url: `/api/classes`,
      method: 'GET',
      params: {
        grade_id: gradeId
      }
    })
    if (!res) return;
    const filteredClasses = res.data?.items.map((classRes: any) => ({ className: classRes.name }));

    setClasses(filteredClasses)
  }

  const handleGetGrades = async () => {
    const res = await axiosInstance({
      url: `/api/grades`,
      method: 'GET',
    })
    if (!res) return;
    const filteredClasses = res.data?.items.map((gradeRes: any) => ({ gradeCode: gradeRes.id, gradeName: gradeRes.name }));

    setGrades(filteredClasses);
  }

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

                {grades && <> <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={{ xs: 3, sm: 2 }}
                >
                  <Autocomplete
                    fullWidth
                    id="combo-box-demo"
                    {...getFieldProps('gradeName')}
                    options={gradesMock}
                    getOptionLabel={option => option.gradeName || ""}
                    onChange={(_, value) => {
                      if (!value) {
                        setFieldValue("grade", { gradeName: null, gradeCode: null })
                        setFieldValue("class", { className: null });
                        return;
                      }
                      setFieldValue("grade", value)
                    }}
                    defaultValue={values.grade}
                    renderInput={params => (
                      <TextField {...params} label="Grade" name="gradeName" />
                    )}
                  />
                 {values.grade?.gradeCode &&  <Autocomplete
                    disabled={!Boolean(values.grade?.gradeCode)}
                    fullWidth
                    id="combo-box-demo"
                    {...getFieldProps('className')}
                    options={classesMock}
                    getOptionLabel={option => option.className || ""}
                    onChange={(_, value) => {
                      console.log(value);
                      if (!value) {
                        setFieldValue("class", { className: null });
                        return;
                      }
                      setFieldValue("class", value)
                    }}
                    defaultValue={values.class}
                    renderInput={params => (
                      <TextField {...params} label="Class" name="className" />
                    )}
                  />}
                </Stack></>
                }

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