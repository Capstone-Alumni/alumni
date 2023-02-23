'use client';

import React from 'react';
import { Box, Typography, useTheme, styled } from '@mui/material';
import Company from './Company';
import Slider from 'react-slick';

const data = [
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4bf558a9-16f5-4513-80f5-86a454dc41b3.png',
    name: 'National Australia Bank',
    location: 'TP.HCM',
    resourcesNeed: 2,
  },
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5ce6475845-00ab-4b0d-931e-8fe744c5db11.png',
    name: 'FPT Software',
    location: 'Can Tho',
    resourcesNeed: 1,
  },
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5csys_company%5c4e60985f-8dd6-4208-965b-b2cb3ccf93d2.png',
    name: 'KMS Technology',
    location: 'Hanoi',
    resourcesNeed: 11,
  },
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c255916d2-2d39-42e3-b3e2-af5a08bc98d4.png',
    name: 'Nimble',
    location: 'Da Nang',
    resourcesNeed: 22,
  },
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c255916d2-2d39-42e3-b3e2-af5a08bc98d4.png',
    name: 'Nimble',
    location: 'Da Nang',
    resourcesNeed: 22,
  },
  {
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c255916d2-2d39-42e3-b3e2-af5a08bc98d4.png',
    name: 'Nimble',
    location: 'Da Nang',
    resourcesNeed: 22,
  },
];

const data2 = [
  {
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
    imageUrl:
      'https://bka.hcmut.edu.vn/FileManager/Download/?filename=%5cimage_upload%5c4bf558a9-16f5-4513-80f5-86a454dc41b3.png',
    major: 'Thực tập sinh nhóm ngành CNTT',
    name: 'FPT Software',
    resourcesNeed: 2,
    location: 'Can Tho',
    expireAt: '15/11/2022',
    salary: 'Thương lượng',
  },
];

const SliderWrapper = styled(Slider)(({ theme }) => ({
  display: 'flex',
}));

const FlexWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  gap: '1rem',

  '& .MuiBox-root': {
    width: '32%',
  },
}));

const CompaniesSlider = () => {
  const theme = useTheme();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    centerPadding: '16px',
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  const handleRenderSlideCompanies = (data: any) => {
    return data.map((company: any) => {
      return <Company companyDetails={company} isSlide />;
    });
  };

  const handleRenderCompanies = (data: any) => {
    return data.map((company: any) => {
      return <Company companyDetails={company} />;
    });
  };
  return (
    <Box>
      <Typography variant="h5">Việc làm nổi bật</Typography>
      <br />
      <SliderWrapper {...settings}>
        {handleRenderSlideCompanies(data)}
      </SliderWrapper>
      <br />
      <Typography variant="h5">Công ty tuyển dụng</Typography>
      <br />
      <FlexWrapper>{handleRenderCompanies(data2)}</FlexWrapper>
      <br />
      <Typography variant="h5">Ngành nghề</Typography>
      <br />
      <FlexWrapper>{handleRenderCompanies(data2)}</FlexWrapper>
      <br />
      <Typography variant="h5">Công ty mới nhất</Typography>
      <br />
      <FlexWrapper>{handleRenderCompanies(data2)}</FlexWrapper>
    </Box>
  );
};

export default CompaniesSlider;
