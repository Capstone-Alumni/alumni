import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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

// ----------------------------------------------------------------------


type UserNewFormProps = {
  currentUser?: UserInformation;
};

export default function EditUserEducation({ currentUser }: UserNewFormProps) {
  const [education, setEducation] = useState<Array<any>>([
    { id: '1', EducationTitle: "junior", company: "NAB", startDate: new Date("2023-01-27T18:04:07.397Z"), endDate: null }
  ]);

  const { register, setValue, formState: { errors }, handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<any> = data => console.log(data);


  const handleDeleteEducation = (id: string) => {
    setEducation(education.filter(education => education.id !== id));
  };

  const handleAddNewEducation = () => {
    setEducation([...education, { id: String(education.length + 1) }]);
  };

  const handleRenderEducation = (education: Array<{ id: string }>) => {
    return education.map((education: any, i: any) => {
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
              defaultValue={education.school}
              {...register(`school${i}`, { required: true })}
              error={Boolean(errors[`school${i}`]?.type === 'required')}
              helperText={errors[`school${i}`] && "School Name is required"}
            />
            <Controller
              name={`startDate${i}`}
              control={control}
              render={({ field: { onChange, value = "" }, fieldState: { error } }) => (

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="Start Date"
                    inputFormat="DD-MM-YYYY"
                    value={value}
                    onChange={(event: any) => { onChange(event) }}
                    renderInput={(params) => (
                      <TextField
                        margin="normal"
                        {...register(`startDate${i}`, {required: false})}
                        fullWidth
                        {...params}
                        error={undefined}
                      />
                    )}
                  />
                </LocalizationProvider>

              )} />
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 3, sm: 2 }}
          >
           <TextField
              fullWidth
              label="Degree"
              defaultValue={education.degree}
              {...register(`degree${i}`, { required: true })}
              error={Boolean(errors[`degree${i}`]?.type === 'required')}
              helperText={errors[`degree${i}`] && "Degree is required"}
            />
             <Controller
              name={`endDate${i}`}
              control={control}
              render={({ field: { onChange, value = "" }, fieldState: { error } }) => (

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="End Date"
                    inputFormat="DD-MM-YYYY"
                    value={value}
                    onChange={(event: any) => { onChange(event) }}
                    renderInput={(params) => (
                      <TextField
                        margin="normal"
                        {...register(`endDate${i}`, {required: false})}
                        fullWidth
                        {...params}
                        error={undefined}
                      />
                    )}
                  />
                </LocalizationProvider>

              )} />
          </Stack>
          <hr />
        </Stack>
      );
    });
  };

  return (
    // <Form noValidate autoComplete="off">
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack sx={{ margin: '1rem 0 0.5rem 0' }}>
              <Typography variant="h5">Your education(s)</Typography>
            </Stack>
            <Stack spacing={3}>
              {handleRenderEducation(education)}
              <Box
                sx={{ mt: 3, display: 'flex', justifyContent: 'flex-start' }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleAddNewEducation() as any}
                >
                  Add new school
                </Button>
              </Box>
            </Stack>
            <Stack spacing={3}>
              <Box
                sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                >
                  Save Changes
                </LoadingButton>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
