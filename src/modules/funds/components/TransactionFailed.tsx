'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorSVG from 'public/error.svg';

const TransactionFailed = () => {
  const router = useRouter();

  return (
    <Stack direction={{ md: 'row', sm: 'column-reverse' }} alignItems="center">
      <Box sx={{ minWidth: '30rem' }}>
        <Typography variant="h1">Ủng hộ thất bại</Typography>
        <Typography sx={{ mb: 2 }}>
          Rất tiếc, ủng hộ không thành công.
        </Typography>
        <Button variant="contained" onClick={() => router.back()}>
          Thử lại
        </Button>
      </Box>
      <ErrorSVG />
    </Stack>
  );
};

export default TransactionFailed;
