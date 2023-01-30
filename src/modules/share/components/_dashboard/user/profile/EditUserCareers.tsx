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
import { Career, UserCareers } from '../../../../type';

// ----------------------------------------------------------------------


type EditUserCareersProps = {
  userCareers?: UserCareers;
};

export default function EditUserCareers({ userCareers }: EditUserCareersProps) {
  const [careers, setCareers] = useState<Array<Career>>(userCareers?.items || []);

  const { register, formState: { errors }, handleSubmit, control } = useForm();

  const onSubmit: SubmitHandler<any> = data => {
    let careersTransformed = [];
    for (let i = 0; i < careers.length; i++) {
      let career = {};
      Object.keys(data).forEach(function (key) {
        let jobNumber = key.charAt(key.length - 1);
        if (jobNumber === i.toString()) {
          career = { ...career, [key.slice(0, key.length - 1)]: data[key] }
        }
      });
      careersTransformed.push(career);
      career = {};
    }
    console.log(careersTransformed);
  };


  const handleDeleteJob = (id: string) => {
    setCareers(careers.filter(career => career.id !== id));
  };

  const handleAddNewJob = () => {
    setCareers([...careers, { id: String(careers.length + 1) }]);
  };

  const handleRenderCareers = (careers: Array<{ id: string }>) => {
    return careers.map((career: any, i: any) => {
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
              defaultValue={career.company}
              {...register(`company${i}`, { required: true })}
              error={Boolean(errors[`company${i}`]?.type === 'required')}
              helperText={errors[`company${i}`] && "Company Name is required"}
            />
            <Controller
              name={`startDate${i}`}
              control={control}
              render={({ field: { onChange, value = career.startDate }, fieldState: { error } }) => (

                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="Start Date"
                    inputFormat="DD-MM-YYYY"
                    value={value}
                    onChange={(event: any) => { onChange(event) }}
                    renderInput={(params) => (
                      <TextField
                        margin="normal"
                        {...register(`startDate${i}`, { required: false })}
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
              label="Your title"
              defaultValue={career.jobTitle}
              {...register(`jobTitle${i}`, { required: true })}
              error={Boolean(errors[`jobTitle${i}`]?.type === 'required')}
              helperText={errors[`jobTitle${i}`] && "Job title is required"}
            />
            <Controller
              name={`endDate${i}`}
              control={control}
              render={({ field: { onChange, value = career.endDate }, fieldState: { error } }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    label="End Date"
                    inputFormat="DD-MM-YYYY"
                    value={value}
                    onChange={(event: any) => { onChange(event) }}
                    renderInput={(params) => (
                      <TextField
                        label="End Date"
                        margin="normal"
                        {...register(`endDate${i}`, { required: false })}
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
