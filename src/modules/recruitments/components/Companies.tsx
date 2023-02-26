'use client';

import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  useTheme,
  styled,
  Button,
  Typography,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import Link from 'next/link';
import CompanyItem from './CompanyItem';
import Slider from 'react-slick';

const data2 = [
  {
    id: '1',
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4bf558a9-16f5-4513-80f5-86a454dc41b3.png',
    major: 'Thực tập sinh nhóm ngành CNTT',
    name: 'FPT Software',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
  {
    id: '2',
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4bf558a9-16f5-4513-80f5-86a454dc41b3.png',
    major:
      'Fresher/Junior/Mefior/Senior/Lead Go Engineer dasd as ds ad as da sd as d',
    name: 'Arduin',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
  {
    id: '8',
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4bf558a9-16f5-4513-80f5-86a454dc41b3.png',
    major: 'Senior Go Engineer',
    name: 'Arduin',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
  {
    id: '3',
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5ce6475845-00ab-4b0d-931e-8fe744c5db11.png',
    major: 'BA Technical Lead',
    name: 'National Australia Bank',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
  {
    id: '4',
    imageUrl: '/side_background.png',
    major: 'Medior ReactJS',
    name: 'NAB Innovation Centre Vietnam',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
];

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

const CompaniesSlider = () => {
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

  const handleRenderSlideCompanies = (data: any) => {
    return data.map((company: any) => {
      return (
        <CompanyItem
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
            <IconButton key="save-btn">
              <BookmarkBorderIcon />
            </IconButton>,
          ]}
        />
      );
    });
  };

  const handleRenderCompanies = (data: any) => {
    return data.map((company: any) => {
      return (
        <CompanyItem
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
            <IconButton key="save-btn">
              <BookmarkBorderIcon />
            </IconButton>,
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
      <Typography variant="h5">Việc làm nổi bật</Typography>
      <Spacer />
      <Grid container>
        <StyledSlider {...settings}>
          {handleRenderSlideCompanies(data2)}
        </StyledSlider>
      </Grid>
      <Spacer />
      <Typography variant="h5" sx={{ margin: '1rem 0' }}>
        Việc làm hot
      </Typography>
      <Spacer />
      <Grid container spacing={2}>
        {handleRenderCompanies(data2)}
      </Grid>
      {/* <br />
      <Typography variant="h5">Ngành nghề</Typography>
      <br />
      <FlexWrapper>{handleRenderCompanies(data2)}</FlexWrapper>
      <br />
      <Typography variant="h5">Công ty mới nhất</Typography>
      <br />
      <FlexWrapper>{handleRenderCompanies(data2)}</FlexWrapper> */}
    </Grid>
  );
};

export default CompaniesSlider;
