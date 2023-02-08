'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Box, TextField, Typography } from '@mui/material';

const VerifyForm = () => {
  const { control } = useFormContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          margin: '2rem 10vw',
        }}
      >
        <Typography mb={6} variant="h4">
          Thông tin cơ bản
        </Typography>

        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Họ và tên*"
              {...field}
              error={Boolean(error?.message)}
              helperText={error?.message}
              sx={{ mb: 3 }}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default VerifyForm;
