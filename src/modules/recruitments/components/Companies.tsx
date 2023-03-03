'use client';

import React from 'react';
import { Box, Button, Grid, styled, Typography, useTheme } from '@mui/material';

import Link from 'next/link';
import CompanyItem from './CompanyItem';
import Slider from 'react-slick';
import { Job } from '../types';

const FlexWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '1rem',

  '& .MuiBox-root': {
    width: '32%',
  },
}));

const Spacer = styled('div')(({ theme }) => ({
  marginTop: `${theme.spacing(6)}`,
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  display: 'flex',
  width: '100%',
}));

const CompaniesSlider = ({ data }: { data: Job[] }) => {
  const theme = useTheme();

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: '16px',
    // autoplay: true,
    // autoplaySpeed: 2000,
    // cssEase: 'linear',
  };

  const handleRenderSlideCompanies = () => {
    return data.map((company: any) => {
      return (
        <CompanyItem
          key={company.id}
          companyDetails={company}
          isSlide
          actions={[
            <Link
              key="edit-btn"
              href={`/recruitments/job_details/${company.id}`}
              style={{ width: '100%', marginRight: theme.spacing(1) }}
            >
              <Button fullWidth variant="outlined">
                Tìm hiểu thêm
              </Button>
            </Link>,
          ]}
        />
      );
    });
  };

  const handleRenderCompanies = () => {
    return data.map((company: any) => {
      return (
        <CompanyItem
          key={company.id}
          companyDetails={company}
          actions={[
            <Link
              key="edit-btn"
              href={`/recruitments/job_details/${company.id}`}
              style={{ width: '100%', marginRight: theme.spacing(1) }}
            >
              <Button fullWidth variant="outlined">
                Tìm hiểu thêm
              </Button>
            </Link>,
          ]}
        />
      );
    });
  };
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mb: 2,
        ml: 2,
        mt: 1,
      }}
    >
      {/* <Typography variant="h5">Việc làm nổi bật</Typography>
      <Spacer />
      <Grid container>
        <StyledSlider {...settings}>
          {handleRenderSlideCompanies()}
        </StyledSlider>
      </Grid>
      <Spacer /> */}
      <Typography variant="h5" sx={{ margin: '0' }}>
        Việc làm hot
      </Typography>
      <Spacer />
      <Grid container spacing={2}>
        {handleRenderCompanies()}
      </Grid>
    </Grid>
  );
};

export default CompaniesSlider;
