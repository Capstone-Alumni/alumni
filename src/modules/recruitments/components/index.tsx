'use client';

import { Box, useTheme } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';
import CompaniesSlider from './CompaniesSlider';

const RecruitmentsPage = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        marginLeft: `-${theme.spacing(2)}`,
        marginRight: `-${theme.spacing(2)}`,
      }}
    >
      <Carousel />
      <CompaniesSlider />
    </Box>
  );
};

export default RecruitmentsPage;
