'use client';

import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const RegisterSuccess = () => {
  return (
    <Stack direction={{ md: 'row', sm: 'column-reverse' }} alignItems="center">
      <Box sx={{ minWidth: '30rem' }}>
        <Typography variant="h2">Đăng ký thành công</Typography>
        <Typography sx={{ mb: 2 }}>
          Đăng ký thành công. Vui lòng chờ ban quản lý xét duyệt thông tin của
          bạn.
        </Typography>
      </Box>
      <Image src="/done.svg" alt="done" width={500} height={500} />
      {/* <Done style={{ fill: theme.palette.success.main }} /> */}
    </Stack>
  );
};

export default RegisterSuccess;
