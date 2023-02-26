'use client';

import { Box, useTheme } from '@mui/material';
import React from 'react';

const InterestJobListPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginLeft: `-${theme.spacing(2)}`,
        marginRight: `-${theme.spacing(2)}`,
      }}
    >
      Việc bạn đã nộp
    </Box>
  );
};

export default InterestJobListPage;
