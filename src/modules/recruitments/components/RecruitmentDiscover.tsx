'use client';

import { Box, useTheme } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';
import Companies from './Companies';

const RecruitmentDiscover = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginLeft: `-${theme.spacing(2)}`,
        marginRight: `-${theme.spacing(2)}`,
      }}
    >
      {/* <Carousel /> */}
      <Companies />
    </Box>
  );
};

export default RecruitmentDiscover;
