import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { toast } from 'react-toastify';
// material
import {
  Autocomplete,
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PersonIcon from '@mui/icons-material/Person';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from '@mui/lab';
// @types
import { useUpdateUserInformationMutation } from 'src/redux/slices/userProfileSlice';
import axiosInstance from 'src/utils/axios';
import { Information } from '@prisma/client';

type UserInfoProps = {
  userInformation?: Information;
};

const UserInfo = ({ userInformation }: UserInfoProps) => {
  const theme = useTheme();
  const [updateUserInformation] = useUpdateUserInformationMutation();

  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);

  const NewUserSchema = Yup.object().shape({
    bio: Yup.string(),
    userEmail: Yup.string(),
    fullName: Yup.string(),
    class: Yup.object()
      .shape({
        className: Yup.string().nullable(),
      })
      .nullable(),
    grade: Yup.object()
      .shape({
        gradeName: Yup.string().nullable(),
        gradeCode: Yup.string().nullable(),
      })
      .nullable(),
    phoneNumber: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userId: userInformation?.userId || '',
      bio: userInformation?.bio || '',
      fullName: userInformation?.fullName || '',
      userEmail: userInformation?.userEmail || '',
      class: {
        className: userInformation?.className || null,
      },
      grade: {
        gradeName: userInformation?.gradeName || null,
        gradeCode: userInformation?.gradeCode || null,
      },
      phone: userInformation?.phone || '',
      dateOfBirth: userInformation?.dateOfBirth || null,
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const { class: _, grade, ...data } = values;
        await updateUserInformation({
          ...data,
          gradeCode: grade.gradeCode,
          gradeName: grade.gradeName,
          className: _.className,
        });
        setSubmitting(false);
        toast.success('Cập nhật thành công');
      } catch (error: any) {
        toast.error('Có lỗi xảy ra, vui lòng thử lại');
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
    if (!(grades.length > 0)) {
      handleGetGrades();
      return;
    }

    if (values?.grade?.gradeCode) {
      handleGetClasses(values.grade.gradeCode);
      return;
    }
    setClasses([]);
  }, [values.grade]);

  const handleGetClasses = async (gradeId: string | null) => {
    const res = await axiosInstance({
      url: '/api/classes',
      method: 'GET',
      params: {
        grade_id: gradeId,
      },
    });
    if (!res) {
      return;
    }
    const filteredClasses = res.data?.items.map((classRes: any) => ({
      className: classRes.name,
    }));

    setClasses(filteredClasses);
  };

  const handleGetGrades = async () => {
    const res = await axiosInstance({
      url: '/api/grades',
      method: 'GET',
    });
    if (!res) {
      return;
    }
    const filteredClasses = res.data?.items.map((gradeRes: any) => ({
      gradeCode: gradeRes.id,
      gradeName: gradeRes.name,
    }));

    setGrades(filteredClasses);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack
                    sx={{
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}
                  >
                    <Typography
                      variant="h5"
                      style={{
                        display: 'flex',
                        fontWeight: 'bold',
                        alignItems: 'center',
                      }}
                    >
                      <PersonIcon
                        fontSize="large"
                        style={{
                          color: theme.palette.primary.main,
                          marginRight: theme.spacing(1),
                        }}
                      />
                      Thông tin cơ bản
                    </Typography>
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
                        label="Họ và tên"
                        {...getFieldProps('fullName')}
                        error={Boolean(touched.fullName && errors.fullName)}
                        helperText={touched.fullName && errors.fullName}
                      />
                      <TextField
                        fullWidth
                        label="Địa chỉ Email"
                        {...getFieldProps('userEmail')}
                        error={Boolean(touched.userEmail && errors.userEmail)}
                        helperText={touched.userEmail && errors.userEmail}
                      />
                    </Stack>

                    {grades && (
                      <>
                        {' '}
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={{ xs: 3, sm: 2 }}
                        >
                          <Autocomplete
                            fullWidth
                            id="combo-box-demo"
                            {...getFieldProps('gradeName')}
                            options={grades}
                            getOptionLabel={option => option.gradeName || ''}
                            onChange={(_, value) => {
                              if (!value) {
                                setFieldValue('grade', {
                                  gradeName: null,
                                  gradeCode: null,
                                });
                                setFieldValue('class', { className: null });
                                return;
                              }
                              setFieldValue('grade', value);
                            }}
                            defaultValue={values.grade}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Khối"
                                name="gradeName"
                              />
                            )}
                          />
                          {values.grade?.gradeCode && (
                            <Autocomplete
                              disabled={!values.grade?.gradeCode}
                              fullWidth
                              id="combo-box-demo"
                              {...getFieldProps('className')}
                              options={classes}
                              getOptionLabel={option => option.className || ''}
                              onChange={(_, value) => {
                                console.log(value);
                                if (!value) {
                                  setFieldValue('class', { className: null });
                                  return;
                                }
                                setFieldValue('class', value);
                              }}
                              defaultValue={values.class}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Lớp"
                                  name="className"
                                />
                              )}
                            />
                          )}
                        </Stack>
                      </>
                    )}

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 3, sm: 2 }}
                    >
                      <TextField
                        fullWidth
                        label="Số điện thoại"
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          onChange={value =>
                            setFieldValue('dateOfBirth', value, true)
                          }
                          value={values.dateOfBirth}
                          label="Ngày sinh"
                          renderInput={params => (
                            <TextField
                              error={Boolean(
                                touched.dateOfBirth && errors.dateOfBirth,
                              )}
                              helperText={
                                touched.dateOfBirth && errors.dateOfBirth
                              }
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
                      sx={{
                        mt: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                      >
                        Lưu
                      </LoadingButton>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};
export default UserInfo;
