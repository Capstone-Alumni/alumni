'use client';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import ThankYou from 'public/thankyou.svg';

const TransactionSuccess = () => {
  const theme = useTheme();

  return (
    <Stack direction={{ md: 'row', sm: 'column-reverse' }} alignItems="center">
      <Box sx={{ minWidth: '30rem' }}>
        <Typography variant="h2">Ủng hộ thành công</Typography>
        <Typography>
          Cảm ơn bạn đã ủng hộ nhà trường. Thông tin ủng hộ của bạn đã được hệ
          thống ghi nhân.
        </Typography>
      </Box>
      <ThankYou style={{ fill: theme.palette.primary.main }} />
    </Stack>
  );
};

export default TransactionSuccess;
