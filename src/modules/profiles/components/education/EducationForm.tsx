import { Box, Button, Typography, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import deepPurple from '@mui/material/colors/deepPurple';
import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '@share/components/form/TextInput';
import DateInput from '@share/components/form/DateInput';

const EducationForm = ({ defaultValues, onSave, onClose }: any) => {
  const theme = useTheme();
  const {
    formState: { isSubmitting },
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-end',
        borderColor: deepPurple[200],
        borderStyle: 'solid',
        borderWidth: '2px',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(4),
      }}
    >
      <Typography
        variant="h6"
        style={{ marginBottom: theme.spacing(3), width: '100%' }}
      >
        {!defaultValues ? 'Thêm trường' : 'Chỉnh sửa thông tin'}
      </Typography>
      {[
        {
          label: 'Tên trường',
          name: 'school',
          type: 'text',
          require: true,
        },
        {
          label: 'Cấp',
          name: 'degree',
          type: 'text',
          require: true,
        },
        {
          label: 'Thời gian bắt đầu',
          name: 'startDate',
          type: 'date',
          require: true,
        },
        {
          label: 'Thời gian kết thúc',
          name: 'endDate',
          type: 'date',
          require: false,
        },
      ].map((item: any) => {
        switch (item.type) {
          case 'text':
            return (
              <TextInput
                control={control}
                name={item.name}
                inputProps={{
                  label: item.label,
                  fullWidth: true,
                  required: item.require,
                }}
              />
            );
          case 'date':
            return (
              <DateInput
                control={control}
                name={item.name}
                inputProps={{
                  fullWidth: true,
                  label: item.label,
                  required: item.require,
                }}
              />
            );
          default:
            return null;
        }
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
