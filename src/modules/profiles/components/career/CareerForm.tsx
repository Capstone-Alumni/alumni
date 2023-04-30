import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import deepPurple from '@mui/material/colors/deepPurple';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '@share/components/form/TextInput';
import DateInput from '@share/components/form/DateInput';

const CareerForm = ({ defaultValues, onSave, onClose }: any) => {
  const theme = useTheme();
  const [isWorking, setIsWorking] = useState<boolean>(
    !Boolean(defaultValues?.endDate),
  );
  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      ...defaultValues,
      startDate: defaultValues?.startDate || new Date(),
      endDate: defaultValues?.endDate || new Date(),
    },
  });

  const onSubmit = async (values: any) => {
    if (isWorking) {
      await onSave(
        {
          ...values,
          endDate: null,
        },
        isWorking,
      );
    } else {
      await onSave(values, isWorking);
    }
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
      <Typography variant="h6" sx={{ width: '100%' }}>
        {!defaultValues ? 'Thêm nơi làm việc' : 'Chỉnh sửa thông tin'}
      </Typography>
      {[
        {
          label: 'Nơi công tác/Công ty',
          name: 'company',
          type: 'text',
          require: true,
        },
        {
          label: 'Chức vụ',
          name: 'jobTitle',
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
        {
          label: 'Đang công tác/làm việc',
          name: 'isWorking',
          type: 'checkbox',
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
                key={item.id}
              />
            );
          case 'date':
            return (
              <DateInput
                control={control}
                name={item.name}
                inputProps={{
                  label: item.label,
                  required: item.require,
                  disabled: item.name === 'endDate' ? isWorking : false,
                }}
                textProps={{
                  sx: {
                    width: '100%',
                  },
                }}
                key={item.id}
              />
            );
          case 'checkbox':
            return (
              <Box sx={{ width: '100%' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isWorking}
                      onChange={() => setIsWorking(!isWorking)}
                    />
                  }
                  label={item.label}
                />
              </Box>
            );
          default:
            return null;
        }
      })}

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={onClose}>Huỷ</Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          Lưu
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CareerForm;
