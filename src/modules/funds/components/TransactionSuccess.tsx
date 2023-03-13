'use client';

import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import ThankYou from 'public/thankyou.svg';

const TransactionSuccess = () => {
  const theme = useTheme();

  return (
    <Stack direction={{ md: 'row', sm: 'column-reverse' }} alignItems="center">
      <Box sx={{ minWidth: '30rem' }}>
        <Typography variant="h2">Ủng hộ thành công</Typography>
        <Typography sx={{ mb: 2 }}>
          Cảm ơn bạn đã ủng hộ nhà trường. Thông tin ủng hộ của bạn đã được hệ
          thống ghi nhận.
        </Typography>
        <Link href="/funds/going">
          <Button role="href">Xem thêm quỹ</Button>
        </Link>
      </Box>
      <ThankYou style={{ fill: theme.palette.success.main }} />
    </Stack>
  );
};

export default TransactionSuccess;
