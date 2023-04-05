'use client';

import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

const WaitingAccessPage = () => {
  return (
    <Stack direction="column" alignItems="center" gap={2}>
      <Image src="/waiting-bro.svg" alt="waiting" width={675} height={450} />
      <Typography variant="body1">
        Rất tiếc, người quản lý lớp của bạn chưa duyệt yêu cầu. Bạn có thể liên
        hệ trực tiếp ban thường trực để được duyệt nhanh hơn nhé
      </Typography>
    </Stack>
  );
};

export default WaitingAccessPage;
