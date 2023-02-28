'use client';

import { Box, useTheme } from '@mui/material';
import React from 'react';

const MyPostedJobsPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginLeft: `-${theme.spacing(2)}`,
        marginRight: `-${theme.spacing(2)}`,
      }}
    >
      Việc làm tôi đăng
    </Box>
  );
};

export default MyPostedJobsPage;
