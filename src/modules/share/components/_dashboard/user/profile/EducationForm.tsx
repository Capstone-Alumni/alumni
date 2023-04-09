import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import deepPurple from '@mui/material/colors/deepPurple';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const EducationForm = ({ defaultValues, onSave, onClose }: any) => {
  const theme = useTheme();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmit = (values: any) => {
    onSave(values);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      style={{
        borderColor: deepPurple[200],
        borderStyle: 'solid',
        borderWidth: '2px',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(4),
      }}
    >
      <Typography variant="h6" style={{ marginBottom: theme.spacing(3) }}>
        {!defaultValues ? 'Thêm trường' : 'Chỉnh sửa thông tin'}
      </Typography>
      {[
        {
          label: 'Tên trường',
          name: 'school',
          type: 'text',
        },
        {
          label: 'Cấp',
          name: 'degree',
          type: 'text',
        },
        {
          label: 'Thời gian bắt đầu',
          name: 'startDate',
          type: 'text',
          placeholder: 'yyyy-yyyy',
        },
        {
          label: 'Thời gian kết thúc',
          name: 'endDate',
          type: 'text',
          placeholder: 'yyyy-yyyy',
        },
      ].map(item => {
        return item.name !== 'startDate' && item.name !== 'endDate' ? (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...register(item.name, { required: true })}
                variant="outlined"
                label={item.label}
                placeholder={item.placeholder}
                error={Boolean(errors[item.name]?.type === 'required')}
                helperText={errors[item.name] && `${item.label} is required`}
                select={item.type === 'select'}
                type={item.type}
                {...field}
                style={{ marginBottom: theme.spacing(3) }}
              />
            )}
          />
        ) : (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            render={({
              field: { onChange, value = defaultValues[item.name] },
            }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={item.label}
                  inputFormat="DD-MM-YYYY"
                  value={value}
                  onChange={(event: any) => {
                    onChange(event);
                  }}
                  renderInput={params => (
                    <TextField
                      margin="normal"
                      {...register(item.name, { required: false })}
                      fullWidth
                      {...params}
                      error={undefined}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />
        );
      })}

      <Box sx={{ marginTop: '0.75rem', gap: '0.5rem', display: 'flex' }}>
        <Button variant="outlined" onClick={onClose}>
          Huỷ
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Lưu
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default EducationForm;
